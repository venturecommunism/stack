import React from 'react'

import TriggersActions from '../../layout/commands/togglefullscreen'

import TriggersScene from '../../triggers/components/TriggersScene'
import Dashboard from '../../ec_dashboard/components/dashboard.jsx'
import Checkout from '../../ec_checkout/components/index.jsx'
import Demo from '../../demo/components/index.jsx'

const Root = () => (
  <div>
    <TriggersScene actions={TriggersActions} />
    <Dashboard />
    <Checkout />
    <Demo />
  </div>
)

export default Root
