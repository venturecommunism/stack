import React from 'react'

import CartScape from '../../cartscape/components/index.jsx'
import Dashboard from '../../ec_dashboard/components/dashboard.jsx'
import Checkout from '../../ec_checkout/components/index.jsx'
import Demo from '../../demo/components/index.jsx'

const Root = () => (
  <div>
    <CartScape />
    <Dashboard />
    <Checkout />
    <Demo />
  </div>
)

export default Root
