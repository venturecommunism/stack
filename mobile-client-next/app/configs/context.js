// Datascript things
import datascript from 'datascript'
import {maindb, componentdb} from './lib/createDBConn'
const conn = maindb()
const conn_components = componentdb()
// const transact = datascript.transact
// Transaction function maintains the log (for time travel, undo, etc.)
function transact(conn, data_to_add, meta) {
  var tx_report = datascript.transact(conn, data_to_add, meta)
//  console.log('resolved tempid', datascript.resolve_tempid(tx_report.tempids, -1))
}

// Elixir / Phoenix Channels things
var clientonly = true
import {go, chan, take, put, timeout, putAsync} from 'js-csp'
import Channel from './channel'
import url from './url'

// Generates random-ish names
const NAMES = ['Girl', 'Boy', 'Horse', 'Foo', 'Face', 'Giant', 'Super', 'Bug', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const me = getRandomUser()

// Transaction log, transaction metadata, connected peers (not used yet),
// data channel for elixir/phoenix, a Data CSP and Auth CSP
var log = []
var meta = []
var peers = []
var channel
let chData = chan()
let chAuth = chan()

// Fires when we receive a message on the Elixir data channel
const receiveDataMessage = (conn, message) => {
  const user = message.user
  const isMe = (someUser) => me === someUser
  console.log('ELIXIR MSG', JSON.stringify(message))

  if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)

    if (message.user === 'system') {
      function org_transaction(s) {
        return [':db/add', s.e, s.a, s.v]
      }

      function sort_func(a, b) {
        return b.tx - a.tx
      }

      var sorted_body = message.body.sort(sort_func)

      var tx_id = message.body[0].tx
      var bool_val = true
      message.body.map( s => s.tx !== tx_id ? bool_val = false : '')
      if (bool_val === true) {
        var single_tx = [[':db/add', 0, 'app/sync', tx_id]]
        message.body.map(s => single_tx.push(org_transaction(s)) )
        transact(conn, single_tx, {'remoteuser': message.user})
        return
      }

      function recurse_array(whole, part) {
        if ((whole.length < 0 || part.length > 0) && whole[whole.length - 1].tx !== part[part.length - 1].tx) {
          var tx_id = part[0].tx
          var array_of_arrays = [[':db/add', 0, 'app/sync', tx_id]]
          part.map(s => array_of_arrays.push(org_transaction(s)) )
          transact(conn, array_of_arrays, {'remoteuser': message.user})
          if (whole.length < 1) return
          recurse_array(whole, [])
        } else {
          part.push(whole[whole.length - 1])
          whole.splice(whole.length - 1, 1)
          recurse_array(whole, part)
        }
      }

      recurse_array(sorted_body, [])

    } else

    if (message.body.id) {
      peers.push(message.body.id)
      transact(conn, [[':db/add', -1, ':app/peer', message.body.id]], {'remoteuser': 'system tweets'})
    } else

    if (message.tweet) {
      transact(conn, [{
        ':db/id': -1,
        ...message
      }], {'remoteuser': 'system tweets'})
    } else {

    const tx = {}
    message.body.map(s => tx[s.a] = s.v)

    transact(conn, [{
      ':db/id': -1,
      ...tx
    }], {'remoteuser': message.user})
  }
}

// Choose between Client and Server
// Sets up the channel on Elixir/Phoenix (client only)
if (clientonly) {
  channel = {}
  channel.send = function () {
    console.log('set clientonly to false in order to actually send')
  }
} else {
  // Data Communicating Sequential Processes. Takes JWT from the Auth CSP and sets up the Elixir channel (server only)
  go(function* () {
    localStorage.removeItem('key')
    var key = yield localStorage.getItem('key') || take(chData)
    console.log('key is:', key)

    var user = me
    var msg = {jwt: key, syncpoint: 'none'}
    const ex_data_channel = Channel(url, "rooms:datomic", user, receiveDataMessage, chData, conn, key)
    yield timeout(10000)
    ex_data_channel.send(msg)
    console.log('yield take chData', yield take(chData))
    console.log('end data go function')
    channel = ex_data_channel
  })

  // Authentication Communicating Sequential Process. Puts a JWT on the Data CSP.
  go(function* () {
    // putAsync is more Communicating Sequential Processes but from outside Go functions
    const receiveAuthMessage = (conn, message) => {
      console.log('message', message)
      putAsync(chAuth, message)
    }
    if (!localStorage.getItem('key')) {
      var user = me
      var msg = {email: 'john@phoenix-trello.com', password: '12345678'}
      const ex_auth_channel = Channel(url, "rooms:auth", user, receiveAuthMessage, chAuth, conn)
      yield timeout(10000)
      ex_auth_channel.send(msg)
      console.log('yield take chAuth', yield take(chAuth))
      var value = yield take(chAuth)
      localStorage.setItem('key', value.jwt)
      yield put(chData, localStorage.getItem('key'))
    }
  })
}

// Datascript listener. Fires when we transact data
datascript.listen(conn, {channel}, function(report) {
  log.push(report.tx_data)
  meta.push(report.tx_meta)

  if (report.tx_meta && (report.tx_meta.remoteuser || report.tx_meta.secrets)) return

//  console.log('META', report.tx_meta)
//  console.log('listened tempid', datascript.resolve_tempid(report.tempids, -1))

  var query = `[:find ?id
                :where [?e ":app/peer" ?id]]`

  var db = datascript.db(conn)

  const qArgs = [query, db]
  var result = datascript.q(...qArgs)
//  console.log('RESULT', result)

  channel.send({data: report.tx_data, meta: report.tx_meta})
})


import Meteor from 'react-native-meteor';
import { AppRegistry } from 'react-native';
import {
  Router,
  Scene,
  Actions,
} from 'react-native-router-flux';

// The actual context. This is the first argument in actions.
export default function () {
  return {
    conn: conn,
    transact: transact,
    log: log,
    conn_components: conn_components,
    meta: meta,
    Meteor,
    Router,
    Scene,
    Actions,
    AppRegistry,
    me,
  };
}
