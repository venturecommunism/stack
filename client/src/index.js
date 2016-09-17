import {initContext} from './configs/context'
import {createApp} from 'mantra-core'

const context = initContext()
const app = createApp(context)

import dataModule from './modules/datascript'

app.loadModule(dataModule)
app.init()

