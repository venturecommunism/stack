import { compose, composeAll } from 'react-komposer'
import { useDeps } from 'react-simple-di'
import datascript from 'datascript'
import React from 'react'
import {Text} from 'react-native'
import Channel from '../../../configs/channel'

const transact = datascript.transact

const dataComposer = ({ context }, onData) => {
  const {conn, me} = context()
//  console.log(conn)
  console.log("me", me)

  var query = `
    [:find ?user
     :where [?u "name"]
            [?u "name" ?user]]`

//  let result = datascript.datoms(datascript.db(conn), ':eavt')

  const qArgs = [query, datascript.db(conn)]
//  let result = datascript.q(...qArgs)
//  onData(null, {result: datascript.datoms(datascript.db(conn), ':eavt')})


// fires when we receive a message
const receiveChatMessage = (conn, message) => {
  const user = message.user
  const isMe = (someUser) => me === someUser
  console.log(JSON.stringify(message))
console.log("me", me)
  if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)
console.log("REMOTE DATA")
  const tx = {}
  message.body.map(function(s){ tx[s.a] = s.v })

  transact(conn, [{
    ':db/id': -1,
    ...tx
  }], {'remoteuser': message.user})
}

const channel = Channel(conn, me, receiveChatMessage)

datascript.listen(conn, function(report) {

//  if (!report.tx_meta || !report.tx_meta.remoteuser) return

  onData(null, {result: datascript.datoms(datascript.db(conn), ':eavt')})
//  if (report.tx_meta && report.tx_meta.remote) return

//  channel.send(report.tx_data)
})

  onData(null, {result: datascript.datoms(datascript.db(conn), ':eavt')})


}

const options = {
  loadingHandler: () => (<Text>loading</Text>),
  errorHandler: e => (<Text>{e.message}</Text>),
}

export default (component) => composeAll(
  compose(dataComposer, options),
  useDeps()
)(component)
