import { Socket } from 'phoenix'

import url from './url'

const TIMEOUT = 10000
const LOBBY = 'rooms:lobby'

export default (conn, user, onChat) => {
  // construct a socket
//  const socket = new Socket(url)

  const socket = new Socket(url, { params: {token: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjEiLCJleHAiOjE0ODc3NzIxNTMsImlhdCI6MTQ4NzUxMjk1MywiaXNzIjoiUGhvZW5peFRyZWxsbyIsImp0aSI6ImY4ZjA2OGE1LTg1ZGMtNDZiNC1iMWYzLTgzNWUwMjMwMDhkNSIsInBlbSI6e30sInN1YiI6IlVzZXI6MSIsInR5cCI6InRva2VuIn0.f4zywKdUYi_xpyhmBWqpKXXdPIC8Bnd7rc0VOX0gK9ykCb7zdKVPsLSSE9zJ-6GIa1HBCYkcraKTFd6nF2h27Q"} } )

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
