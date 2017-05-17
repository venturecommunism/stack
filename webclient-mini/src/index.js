import {initContext} from './configs/context'
import {createApp} from 'mantra-core'

const context = initContext()
const app = createApp(context)

import coreModule from './modules/core'
import chatgameModule from './modules/chatgaym'
import demoModule from './modules/demo/index'
import querybuilderModule from './modules/querybuilder/index'

app.loadModule(coreModule)
app.loadModule(chatgameModule)
app.loadModule(demoModule)
app.loadModule(querybuilderModule)
app.init()

