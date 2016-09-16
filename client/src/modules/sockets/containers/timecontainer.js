import { useDeps, compose, composeAll } from 'mantra-core'
import Channel from '../channel'
import d from 'datascript'

  // fires when we receive a message
  const receiveChatMessage = (message) => {
    const { user } = message
const isMe = (someUser) => user === someUser
console.log(message)
    if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)
console.log({
  text: message.body,
  name: message.user,
  position: 'left',
})
  }

const onPropsChange = (props, onData) => {


// yes, i'm 41 years old.
const NAMES = ['Girl', 'Boy', 'Horse', 'Poo', 'Face', 'Giant', 'Super', 'Butt', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const user = getRandomUser()


    const channel = Channel(user, receiveChatMessage)
    channel.send("yow")


var db = d.db_with(d.empty_db(), [[":db/add", 1, "name", "Terin"],
                         [":db/add", 1, "age", 17]])

var q = '[:find ?n ?a :where [?e "name" ?n] [?e "age" ?a]]'

//console.log(d.q(q, db))

  const handle = setInterval(() => {
//    const time = (new Date()).toString();
const time = d.q(q, db)
    onData(null, {time});
  }, 1000);

  const cleanup = () => clearInterval(handle);
  return cleanup;
}

//export default compose(onPropsChange)(Time)

export default (component) => composeAll(
  compose(onPropsChange),
  useDeps()
)(component)


