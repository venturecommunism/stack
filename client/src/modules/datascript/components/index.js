import React from 'react'

import Dashboard from '../../ec_dashboard/components/dashboard.jsx'
import Checkout from '../../ec_checkout/components/index.jsx'
import Subindex from './subindex'

const Root = () => (
  <div>
    <Dashboard />
    <Checkout />
    <Subindex />
  </div>
)

export default Root
