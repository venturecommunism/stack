import {initContext} from './configs/context'
import {createApp} from 'mantra-core'

const context = initContext()
const app = createApp(context)

import coreModule from './modules/core'
import layoutModule from './modules/layout'
import demoModule from './modules/demo'
import ec_checkoutModule from './modules/ec_checkout'

app.loadModule(coreModule)
app.loadModule(layoutModule)
app.loadModule(demoModule)
app.loadModule(ec_checkoutModule)
app.init()

