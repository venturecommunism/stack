import { Socket } from 'phoenix'

import url from './url'

const TIMEOUT = 10000
const LOBBY = 'rooms:lobby'

export default (conn, user, onChat) => {
  // construct a socket
//  const socket = new Socket(url)

  const socket = new Socket(url, { params: {token: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjEiLCJleHAiOjE0ODgwNDAzNjIsImlhdCI6MTQ4Nzc4MTE2MiwiaXNzIjoiUGhvZW5peFRyZWxsbyIsImp0aSI6IjYwZGNjOWU1LWQyM2ItNDUzYi1iNTY5LWI3ZjA4NGFmNTc4YyIsInBlbSI6e30sInN1YiI6IlVzZXI6MSIsInR5cCI6InRva2VuIn0.2iSXb2WdQWG7OLbYX9qBGADNIbMQ8aiVOTi-5m7waWjW5K-wYBn82rGNZsrJJ0bPBvSYBe8VYLQ0V0wGBIJh1A"} } )

  // configure the event handlers
  socket.onOpen(event => console.log('Connected.'))
  socket.onError(event => console.log('Cannot connect.'))
  socket.onClose(event => console.log('Goodbye.'))

  // open a connection to the server
  socket.connect()

  // configure a channel into a room - https://www.youtube.com/watch?v=vWFX4ylV_ko
  const chan = socket.channel(LOBBY, { user })

  // join the channel and listen for admittance
  chan.join()
    .receive('ignore', () => console.log('Access denied.'))
    .receive('ok', () => console.log('Access granted.'))
    .receive('timeout', () => console.log('Must be a MongoDB.'))

  // add some channel-level event handlers
  chan.onError(event => console.log('Channel blew up.'))
  chan.onClose(event => console.log('Channel closed.'))

  // when we receive a new chat message, just trigger the appropriate callback
  chan.on('new:msg', msg => onChat && onChat(conn, msg))

  // you can can listen to multiple types
  chan.on('user:entered', msg => console.log('say hello to ', msg))

  // a function to shut it all down
  const close = () => socket.disconnect()

  // a function to send a message
  const send = (message) => {
    chan.push('new:msg', {body: message, user}, TIMEOUT)
      .receive('ok', (msg) => console.log('sent'))
      .receive('error', (reasons) => console.log('flop', reasons))
      .receive('timeout', () => console.log('slow much?'))
  }

  // reveal a couple ways to drive this bus
  return { close, send }
}
