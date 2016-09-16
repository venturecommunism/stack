import {createApp} from 'mantra-core'
import {initContext} from './configs/context'

const context = initContext()
const app = createApp(context)

import dataModule from './modules/datascript'

app.loadModule(dataModule)
app.init()

