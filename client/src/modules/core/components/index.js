import React from 'react'

import TriggersPage from '../../triggers/components/TriggersPage'
import Dashboard from '../../ec_dashboard/components/dashboard.jsx'
import Checkout from '../../ec_checkout/components/index.jsx'
import Demo from '../../demo/components/index.jsx'

const Root = () => (
  <div>
    <TriggersPage />
    <Dashboard />
    <Checkout />
    <Demo />
  </div>
)

export default Root
