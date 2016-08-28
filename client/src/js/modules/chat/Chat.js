import { Socket } from 'phoenix'

const TIMEOUT = 10000
const URL = 'ws://xx.xxx.xxx.xxx:4000/socket'
const LOBBY = 'rooms:lobby'

console.log("test")

export default (user, onChat) => {
  // construct a socket
console.log("constructed Chat.js")
  const socket = new Socket(URL)
console.log("new socket")
  // configure the event handlers
  socket.onOpen(event => console.log('Connected.'))
  socket.onError(event => console.log('Cannot connect.'))
  socket.onClose(event => console.log('Goodbye.'))
console.log("socket dostuff")
  // open a connection to the server
socket.connect()
console.log("socket connect")
  // configure a channel into a room - https://www.youtube.com/watch?v=vWFX4ylV_ko
  const chan = socket.channel(LOBBY, { user })
console.log("about to join")
  // join the channel and listen for admittance
  chan.join()
    .receive('ignore', () => console.log('Access denied.'))
    .receive('ok', () => console.log('Access granted.'))
    .receive('timeout', () => console.log('Must be a MongoDB.'))

  // add some channel-level event handlers
  chan.onError(event => console.log('Channel blew up.'))
  chan.onClose(event => console.log('Channel closed.'))

  // when we receive a new chat message, just trigger the appropriate callback
  chan.on('new:msg', msg => onChat && onChat(msg))

  // you can can listen to multiple types
  chan.on('user:entered', msg => console.log('say hello to ', msg))

  // a function to shut it all down
  const close = () => socket.disconnect()
console.log("good and joined")
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
