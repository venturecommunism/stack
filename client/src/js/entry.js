/*
// Import CSS
import '../css/master.scss';

// Import React and JS
import './../../node_modules/material-design-lite/material.js';
import {createApp} from 'mantra-core';
import {initContext} from './configs/context';
import coreModule from './modules/chi2016';

const context = initContext();
const app = createApp(context);

app.loadModule(coreModule);
app.init();
*/
// import HelloBox from './components/atoms/hello-box';
// import React from 'react';
// import ReactDOM from 'react-dom';

// Render!
// ReactDOM.render(<HelloBox />, document.getElementById('react-root'));

import Time from './modules/chat/components/time.jsx'
import Root from './modules/chat/containers/timecontainer'
//import Root from './modules/chat/components/Redux.jsx'
//import Root from './modules/chat/components/Root.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

const RootContainer = Root(Time)

ReactDOM.render(<RootContainer />, document.getElementById('react-root'))
