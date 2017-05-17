import {initContext} from './configs/context'
import {createApp} from 'mantra-core'

const context = initContext()
const app = createApp(context)

import coreModule from './modules/core'
import demoModule from './modules/demo'
import chatgameModule from './modules/chatgame'
import querybuilder from './modules/querybuilder'

app.loadModule(coreModule)
app.loadModule(demoModule)
app.loadModule(chatgameModule)
app.loadModule(querybuilder)
app.init()

