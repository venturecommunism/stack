import datascript from 'datascript'
import createDBConn from '../lib/createDBConn'
import { Socket } from 'phoenix'
import Channel from './channel'
import url from './url'

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

  transact(conn, message.body, {'remote': true})
}

const channel = Channel(conn, me, receiveChatMessage)

// fires when we transact data
datascript.listen(conn, {channel}, function(report) {
  log.push(report.tx_data)
  meta.push(report.tx_meta)

  console.log("tx:", report.tx_data)
  report.tx_data.forEach(function(item) {
    if (item.a === 'v') {
      console.log("BEGIN")
      console.log("VALUE", item.v)
    }
    if (item.a === 'tx') {
      console.log("TX", item.tx)
    }
    if (item.a === 'e') {
      console.log("ENTITY", item.e)
    }
    if (item.a === 'added') {
      console.log("ADDED", item.added)
    }
    if (item.a === 'a') {
      console.log("ATTRIBUTE", item.v)
      console.log("END")
    }
  })

  if (report.tx_meta && report.tx_meta.remote) return

  channel.send(report.tx_data)
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
