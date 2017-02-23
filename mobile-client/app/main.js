import { createApp } from 'mantra-plus';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
//import cartScapeModule from './modules/cartscape/index'
import demoModule from './modules/demo'
//import ec_checkoutModule from './modules/ec_checkout'
import twitterplusModule from './modules/twitterplus'
import webrtcvideoModule from './modules/webrtcvideo'

// create context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
//app.loadModule(cartScapeModule)
app.loadModule(demoModule)
//app.loadModule(ec_checkoutModule)
app.loadModule(twitterplusModule)
app.loadModule(webrtcvideoModule)
app.init();
