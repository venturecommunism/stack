import React from 'react'
import { useDeps, compose, composeAll } from 'mantra-core'
import Chat from '../Chat'
import d from 'datascript'
import {createStore} from 'redux'


  // fires when we receive a message
  const receiveChatMessage = (message) => {
    const { user } = message
console.log(message)
    if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)
console.log({
  text: message.body,
  name: message.user,
  image: avatar,
  position: 'left',
  date: moment()
})
  }


console.log("root2")

const defaultState = {time: new Date().toString()};

console.log("test")

const store = createStore((state = defaultState, action) => {
  switch(action.type) {
    case 'UPDATE_TIME':
      return {
        ...state,
        time: action.time
      };
    default:
      return state;
  }
});

console.log("test2")

setInterval(() => {
  store.dispatch({
    type: 'UPDATE_TIME',
    time: new Date().toString()
  });
}, 1000);

console.log("test3")

const onPropsChange = (props, onData) => {


// yes, i'm 41 years old.
const NAMES = ['Girl', 'Boy', 'Horse', 'Poo', 'Face', 'Giant', 'Super', 'Butt', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const user = getRandomUser()
const isMe = (someUser) => user === someUser
const avatar = { uri: 'https://facebook.github.io/react/img/logo_og.png' }


    const chat = Chat(user, receiveChatMessage)
    chat.send("yow")


var db = d.db_with(d.empty_db(), [[":db/add", 1, "name", "Ivan"],
                         [":db/add", 1, "age", 17]])

var q = '[:find ?n ?a :where [?e "name" ?n] [?e "age" ?a]]'

console.log(d.q(q, db))

  const handle = setInterval(() => {
//    const time = (new Date()).toString();
const time = d.q(q, db)
    onData(null, {time});
  }, 1000);

  const cleanup = () => clearInterval(handle);
  return cleanup;
}

console.log("test4")

//export default compose(onPropsChange)(Time)

export default (component) => composeAll(
  compose(onPropsChange),
  useDeps()
)(component)


console.log("test5")

const dataComposer = ({context, actions}, onData) => {
console.log("test6")
var db = d.db_with(d.empty_db(), [[":db/add", 1, "name", "Ivan"],
                         [":db/add", 1, "age", 17]])

var q = '[:find ?n ?a :where [?e "name" ?n] [?e "age" ?a]]'

console.log(d.q(q, db))

    const time = {"some": "data"}
    time.sub = d.q(q, db)

    const sendData = () => {
      onData(null, {
        time,
      })

    sendData()
    return Store.subscribe(sendData)
  }
}

/*
export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
*/
