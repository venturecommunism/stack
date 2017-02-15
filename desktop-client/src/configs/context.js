import datascript from 'datascript'
import createDBConn from '../lib/createDBConn'
import { Socket } from 'phoenix'
import Channel from './channel'
import url from './url'
import publickey from './publickey'

import {KJUR, KEYUTIL, b64utoutf8} from 'jsrsasign'
const creds = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODcxMTE2NjQsImlhdCI6MTQ4NzExMTY2NCwiZXhwIjoxNDg3MTk4MDY0LCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.pqcMDbUSeSX04fSwaOXqb7it6cBy6QaJhB_Ee7IrlJZtMYlVML7zmfB3FU7O494Qkh8n1luXKFSlEeytCNx5HHBSCCtOsBIG6aaqSmW-u2awwQgpzMFFD5MUTNqnOFnjw3DjPubNIQqMbC9Y5c7xvWlz6GFwP7YEOwjCVTitf1wEhN3b2iNBUF5DtUukFMnEMv2pEPi9PAzY0LzJHzJRg9Ntc7jqKi060ELppOcjOV1GSs-ofF1Z--xNXZbi5vULaYEyh6inN0wFDdoEz1lq6xSJUSFRMgCbULXRCqhtaK1A2Fhqg3aTRPInavXnJutozlgUYI7sbyXtVKbNSEWUyA'

import Peer from 'peerjs'

var peer = new Peer({
  // Set API key for cloud server (you don't need this if you're running your
  // own.
  key: 'x7fwx2kavpy6tj4i',
  // Set highest debug level (log everything!).
  debug: 0,
  // Set a logging function:
  logFunction: function() {
    var copy = Array.prototype.slice.call(arguments).join(' ')
    console.log(copy)
  }
})

const NAMES = ['Girl', 'Boy', 'Horse', 'Foo', 'Face', 'Giant', 'Super', 'Bug', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const me = getRandomUser()

const socket = new Socket(url)
const conn = createDBConn()
const transact = datascript.transact
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

  if (report.tx_meta && report.tx_meta.remoteuser || report.tx_meta.secrets) return

  var query = `[:find ?id
                :where [?e ":app/peer" ?id]]`

  var db = datascript.db(conn)

  const qArgs = [query, db]
  var result = datascript.q(...qArgs)
  console.log('RESULT', result)

  result.map( s => {
    var webrtc = peer.connect(s)
    webrtc.on('open', function(){
      webrtc.send(JSON.stringify({creds: creds, body: report.tx_data}))
    })
  })

  // channel.send(report.tx_data)
})

peer.on('connection', connect)

function connect(c) {
  c.on('data', function(data) {
    const tx = {}

    console.log(c)
    console.log('WEBRTC MSG', data)

    const pubkey = KEYUTIL.getKey(publickey)

    const isValid = KJUR.jws.JWS.verifyJWT(JSON.parse(data).creds, pubkey, {alg: ['RS256']})

    if (!isValid) {
      console.log('unauthorized attempt')
      return
    }

    data = JSON.parse(data).body

    data.map(s => tx[s.a] = s.v)
    console.log('c', c)
    transact(conn, [{
      ':db/id': -1,
      ...tx
    }], {'remoteuser': c.peer})
  })
}

export const initContext = () => {
  return {
    peer: peer,
    peers: peers,
    socket: socket,
    conn: conn,
    channel: channel,
    transact: transact,
    log: log,
    meta: meta,
  }
}
