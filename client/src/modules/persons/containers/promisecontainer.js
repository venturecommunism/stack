//import React from 'react'

import {composeWithPromise} from 'react-komposer'

//import Time from '../components/time.jsx'
//const Time = ({time}) => (<div>{time}</div>)

// Assume this get's the time from the Server
const getServerTime = () => {
    return new Promise((resolve) => {
    const time = new Date().toString();
    setTimeout(() => resolve({time}), 2000);
  });
};

// Create the composer function and tell how to fetch data
const composerFunction = (props) => {
	return getServerTime();
}

export default (component) => composeWithPromise(composerFunction)(component)

