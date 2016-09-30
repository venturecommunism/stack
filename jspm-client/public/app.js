import {initContext} from './configs/context'
import {createApp} from 'mantra-core'

const context = initContext()
const app = createApp(context)

import demoModule from './modules/demo/index'

app.loadModule(demoModule)
app.init()
