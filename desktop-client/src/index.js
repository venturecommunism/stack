import {initContext} from './configs/context'
import {createApp} from 'mantra-core'

const context = initContext()
const app = createApp(context)

import coreModule from './modules/core'
//import cartScapeModule from './modules/cartscape/index'
import demoModule from './modules/demo'
import ec_checkoutModule from './modules/ec_checkout'
import twitterplus from './modules/twitterplus'
import querybuilder from './modules/querybuilder'
import signin from './modules/signin'

app.loadModule(coreModule)
//app.loadModule(cartScapeModule)
app.loadModule(demoModule)
app.loadModule(ec_checkoutModule)
app.loadModule(twitterplus)
app.loadModule(querybuilder)
app.loadModule(signin)
app.init()

