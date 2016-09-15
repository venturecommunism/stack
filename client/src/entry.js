/*
import {createApp} from 'mantra-core'
import {initContext} from './configs/context'

const context = initContext()
const app = createApp(context)

app.loadModule(coreModule)
app.init()
*/

import Time from './modules/chat/components/time.jsx'
import Root from './modules/chat/containers/timecontainer'
//import Root from './modules/chat/components/Redux.jsx'
//import Root from './modules/chat/components/Root.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

import DataScript from './modules/datascript/index'

const RootContainer = Root(Time)
const DataScriptContainer = Root(DataScript)

ReactDOM.render(<DataScriptContainer />, document.getElementById('react-root'))
