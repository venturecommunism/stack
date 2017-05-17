import datascript from 'datascript'
import createDBConn from '../lib/createDBConn'
import { Socket } from 'phoenix'
import Channel from './channel'
import url from './url'
import publickey from './publickey'

import Peer from 'simple-peer'
/*
const initpeer = new Peer({
  initiator: true,
  trickle: false
})

initpeer.on('error', function (err) { console.log('error', err) })

initpeer.on('signal', function (data) {
  console.log('SIGNAL', JSON.stringify(data))
})

initpeer.on('connect', function () {
  console.log('CONNECT')
  peer.send('whatever' + Math.random())
})

initpeer.on('data', function (data) {
  console.log('data: ' + data)
})
*/
const peer = new Peer({
  initiator: false,
  trickle: false
})

peer.on('error', function (err) { console.log('error', err) })

peer.on('signal', function (data) {
  console.log('SIGNAL', JSON.stringify(data))
})

peer.on('connect', function () {
  console.log('CONNECT')
  peer.send('whatever' + Math.random())
})

peer.on('data', function (data) {
  console.log('data: ' + data)
})


const NAMES = ['Girl', 'Boy', 'Horse', 'Foo', 'Face', 'Giant', 'Super', 'Bug', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const me = getRandomUser()

const exsocket = new Socket(url)
const conn = createDBConn()
//const transact = datascript.transact

function transact(conn, data_to_add, meta) {
  var tx_report = datascript.transact(conn, data_to_add, meta)
  // console.log('resolved tempid', datascript.resolve_tempid(tx_report.tempids, -1))
}

var log = []
var meta = []
var peers = []

// fires when we receive a message
const receiveChatMessage = (conn, message) => {
  const user = message.user
  const isMe = (someUser) => me === someUser
  console.log('ELIXIR MSG', JSON.stringify(message))

  if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)

    if (message.user == 'system') {
      function org_transaction(s) {
        return [':db/add', s.e, s.a, s.v]
      }

      function sort_func(a, b) {
        return b.tx - a.tx
      }

      var sorted_body = message.body.sort(sort_func)

      var tx_id = message.body[0].tx
      var bool_val = true
      message.body.map( s => s.tx != tx_id ? bool_val = false : '')
      if (bool_val == true) {
        var single_tx = [[':db/add', 0, 'app/sync', tx_id]]
        message.body.map(s => single_tx.push(org_transaction(s)) )
        transact(conn, single_tx, {'remoteuser': message.user})
        return
      }

      function recurse_array(whole, part) {
        if (whole.length < 1 || part.length > 0 && whole[whole.length - 1].tx != part[part.length - 1].tx) {
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

const channel = Channel(conn, me, receiveChatMessage)

// fires when we transact data
datascript.listen(conn, {channel}, function(report) {
  log.push(report.tx_data)
  meta.push(report.tx_meta)

  if (report.tx_meta && report.tx_meta.remoteuser || report.tx_meta && report.tx_meta.secrets) return

  console.log('META', report.tx_meta)
  console.log('listened tempid', datascript.resolve_tempid(report.tempids, -1))

  var query = `[:find ?id
                :where [?e ":app/peer" ?id]]`

  var db = datascript.db(conn)

  const qArgs = [query, db]
  var result = datascript.q(...qArgs)
  console.log('RESULT', result)

  channel.send({data: report.tx_data, meta: report.tx_meta})
})

export const initContext = () => {
  return {
//    peer: peer,
    peers: peers,
    socket: exsocket,
    conn: conn,
    channel: channel,
    transact: transact,
    log: log,
    meta: meta,
  }
}
