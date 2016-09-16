import React from 'react'
import ReactDOM from 'react-dom'

import {createApp} from 'mantra-core'
import {initContext} from './configs/context'

const context = initContext()
const app = createApp(context)

import coreModule from './modules/datascript'

app.loadModule(coreModule)
app.init()

import Root from './modules/chat/containers/timecontainer'
const DataScriptContainer = Root(coreModule)

ReactDOM.render(<DataScriptContainer />, document.getElementById('root'))

