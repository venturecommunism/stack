import datascript from 'datascript'
import createDBConn from '../lib/createDBConn'
import { Socket } from 'phoenix'
import Channel from './channel'
import url from './url'

const NAMES = ['Girl', 'Boy', 'Horse', 'Foo', 'Face', 'Giant', 'Super', 'Bug', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const user = getRandomUser()

const socket = new Socket(url)
const conn = createDBConn()
const transact = datascript.transact
var log = []
var meta = []

// fires when we receive a message
const receiveChatMessage = (conn, message) => {
  const me = message.user
  const isMe = (someUser) => user === someUser
  console.log(message)

  if (isMe(me)) return // prevent echoing yourself (TODO: server could handle this i guess?)

  transact(conn, [{
    ':db/id': -1,
    name: `Follower of ${message.user} ${new Date().getTime()}`,
    follows: ['name', 'Jane']
  }], {'foreign': true})
}

// fires when we transact data
datascript.listen(conn, function(report) {
  log.push(report.tx_data)
  meta.push(report.tx_meta)

  if (report.tx_meta && report.tx_meta.foreign) return

  const channel = Channel(conn, user, receiveChatMessage)
  channel.send("We built this city on rock and roll!")

})

export const initContext = () => {
  return {
    socket: socket,
    conn: conn,
    transact: transact,
    log: log,
    meta: meta,
  }
}
