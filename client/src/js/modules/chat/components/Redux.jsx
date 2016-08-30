import React from 'react'
import {compose} from 'mantra-core'
import moment from 'moment'
import Chat from '../Chat'
import Container from '../containers/container'
import {createStore} from 'redux'

console.log("root2")

const defaultState = {time: new Date().toString()};

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

console.log("test")

setInterval(() => {
  store.dispatch({
    type: 'UPDATE_TIME',
    time: new Date().toString()
  });
}, 1000);

console.log("test2")

const Time = ({time}) => (<div><b>Time is</b>: {time}</div>);

console.log("test3")

const onPropsChange = (props, onData) => {
  const handle = setInterval(() => {
    const time = (new Date()).toString();
    onData(null, {time});
  }, 1000);

  const cleanup = () => clearInterval(handle);
  return cleanup;
}

const Root = compose(onPropsChange)(Time);

console.log("test4")

//import PoisonedMessenger from './PoisonedMessenger' 

// yes, i'm 41 years old.
const NAMES = ['Girl', 'Boy', 'Horse', 'Poo', 'Face', 'Giant', 'Super', 'Butt', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const user = getRandomUser()
const isMe = (someUser) => user === someUser
const avatar = { uri: 'https://facebook.github.io/react/img/logo_og.png' }

console.log("end")

export default Root
