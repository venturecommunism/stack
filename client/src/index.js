import {initContext} from './configs/context'
import {createApp} from 'mantra-core'

const context = initContext()
const app = createApp(context)

import ec_checkoutModule from './modules/ec_checkout'
import dataModule from './modules/datascript'

app.loadModule(ec_checkoutModule)
app.loadModule(dataModule)
app.init()

