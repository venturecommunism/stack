import {createApp} from 'mantra-core'
import {initContext} from './configs/context'

const context = initContext()
const app = createApp(context)

import coreModule from './modules/datascript'

app.loadModule(coreModule)
app.init()

