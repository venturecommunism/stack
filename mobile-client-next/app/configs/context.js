import datascript from 'datascript'
import createDBConn from '../lib/createDBConn'
import { Socket } from 'phoenix'
import Channel from './channel'
import url from './url'

import Meteor from 'react-native-meteor';
import { AppRegistry } from 'react-native';
import {
  Router,
  Scene,
  Actions,
} from 'react-native-router-flux';

// Meteor.connect('ws://localhost:3000/websocket');

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

  const tx = {}

  if (message.tweet) {
    transact(conn, [{
      ':db/id': -1,
      ...message
    }], {'remoteuser': 'system tweets'})
  } else {

    message.body.map( s => tx[s.a] = s.v )

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

export default function () {
  return {
    socket: socket,
    conn: conn,
    transact: transact,
    log: log,
    meta: meta,
    Meteor,
    Router,
    Scene,
    Actions,
    AppRegistry,
    me,
  };
}
