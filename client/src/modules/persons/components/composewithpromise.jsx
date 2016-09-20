import React from 'react'

// Import the composeWithPromise function, you may get this via NPM.
// const {composeWithPromise} = require('react-komposer');
// import {composeWithPromise} from 'react-komposer'
import {composeWithPromise} from 'react-komposer'

// Create a component to display Time
const Time = ({time}) => (<div>{time}</div>);

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
};

// Compose the container
const Loading = () => (<p>Waiting for Server Time ...</p>);
const Clock = composeWithPromise(composerFunction)(Time, Loading);

export default Clock

