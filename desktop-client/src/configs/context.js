import datascript from 'datascript'
import createDBConn from '../lib/createDBConn'
import { Socket } from 'phoenix'
import Channel from './channel'
import url from './url'

/******* peerjs ********/

import Peer from 'peerjs'

var peer = new Peer({
  // Set API key for cloud server (you don't need this if you're running your
  // own.
  key: 'x7fwx2kavpy6tj4i',
  // Set highest debug level (log everything!).
  debug: 3,
  // Set a logging function:
  logFunction: function() {
    var copy = Array.prototype.slice.call(arguments).join(' ')
    console.log(copy)
  }
})
var connectedPeers = {}

// Show this peer's ID.

//peer.on('open', function(id){
//  console.log(id)
//})

// Connect

var rtconn = peer.connect('another-peers-id')

console.log(rtconn)

rtconn.on('open', function(){
  rtconn.send('hi!')
})

// Receive

peer.on('connection', function(conn) {
  rtconn.on('data', function(data){
    // Will print 'hi!'
    console.log(data)
  })
})

/******* peerjs ********/


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

// fires when we receive a message
const receiveChatMessage = (conn, message) => {
  const user = message.user
  const isMe = (someUser) => me === someUser
  console.log(JSON.stringify(message))

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
      console.log("Got an id:", message.body.id)
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

  if (report.tx_meta && report.tx_meta.remoteuser) return

  channel.send(report.tx_data)
})

peer.on('open', function(id){
  console.log(id)
  channel.send({id: id})
})


export const initContext = () => {
  return {
    socket: socket,
    conn: conn,
    channel: channel,
    transact: transact,
    log: log,
    meta: meta,
  }
}
