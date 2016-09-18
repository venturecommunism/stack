import { useDeps, compose, composeAll } from 'mantra-core'
import Channel from '../channel'
import datascript from 'datascript'

  // fires when we receive a message
const receiveChatMessage = (conn, message) => {
  const { user } = message
  const isMe = (someUser) => user === someUser
  console.log(message)

  const transact = (conn, data, txMsg) => {
    console.log("conn", conn)
    console.log("data", data)
    console.log("txMsg", txMsg)
    datascript.transact(conn, data, txMsg);
  }

  transact(conn, [

    {
      ':db/id': -1,
      name: `Follower of ${message.user} ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }

  ])

  if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)
}

const onPropsChange = (props, onData) => {
  const conn = props.context().conn
  // yes, i'm 41 years old.
  const NAMES = ['Girl', 'Boy', 'Horse', 'Poo', 'Face', 'Giant', 'Super', 'Butt', 'Captain', 'Lazer']
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
  const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
  const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
  const user = getRandomUser()
  const channel = Channel(conn, user, receiveChatMessage)
  channel.send("yow")

  var db = datascript.db_with(datascript.empty_db(), [[":db/add", 1, "name", "Terin"],
                         [":db/add", 1, "age", 17]])

  var q = '[:find ?n ?a :where [?e "name" ?n] [?e "age" ?a]]'

  const handle = setInterval(() => {
    const msg = datascript.q(q, db)
    onData(null, {msg})
  }, 1000)

  const cleanup = () => clearInterval(handle)
  return cleanup
}

export default (component) => composeAll(
  compose(onPropsChange),
  useDeps()
)(component)
