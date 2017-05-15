import { Socket } from 'phoenix'
import datascript from 'datascript'

import url from './url'

const TIMEOUT = 10000
const LOBBY = 'rooms:lobby'

export default (conn, user, onChat) => {
  // construct a socket
  const socket = new Socket(url, { params: {
    token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjEiLCJleHAiOjE0OTMwODc1ODUsImlhdCI6MTQ5MjgyODM4NSwiaXNzIjoiUGhvZW5peFRyZWxsbyIsImp0aSI6ImVmNTQ0NjYwLWQyOTAtNDUxMC05NmVmLWVmNWY4NDQ5NzBlMSIsInBlbSI6e30sInN1YiI6IlVzZXI6MSIsInR5cCI6InRva2VuIn0.vUhPr0QZykXL9-vTkNIkTWGsOl1Hq27zTZNwk7UflY6w-IBIP6g_ff8RR0KL2eeWXfpPSdTZB483g8nzyIGBOw'
  } })
//  const socket = new Socket(url)

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
    .receive('ok', () => syncfunc())
    .receive('timeout', () => console.log('Must be a MongoDB.'))

  // add some channel-level event handlers
  chan.onError(event => console.log('Channel blew up.'))
  chan.onClose(event => console.log('Channel closed.'))

  // when we receive a new chat message, just trigger the appropriate callback
  chan.on('new:msg', msg => onChat && onChat(conn, msg))

  // you can can listen to multiple types
  chan.on('user:entered', msg => console.log('say hello to ', msg))
  function syncfunc() {
    console.log('Access Granted. Syncing...')
    var obj = {}
    obj.email = 'john@phoenix-trello.com'
    obj.password = '12345678'
    send(obj)
    var query = `[:find ?latest_tx :where [?e "app/sync" ?latest_tx]]`
    var syncpoint = datascript.q(query, datascript.db(conn))
//    syncpoint[0] ? console.log(syncpoint[0][0]) : console.log('no syncpoint')
    syncpoint[0] ? send({"syncpoint": syncpoint[0][0]}) : send({"syncpoint": "none"})
  }

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
