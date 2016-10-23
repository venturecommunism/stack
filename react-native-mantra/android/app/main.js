import { createApp } from 'mantra-plus';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';

// create context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.init();
