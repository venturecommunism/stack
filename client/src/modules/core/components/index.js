import React from 'react'

import TwitterPlus from '../../twitterplus/components/index.jsx'
import CartScape from '../../cartscape/components/index.jsx'
import Dashboard from '../../ec_dashboard/components/dashboard.jsx'
import Checkout from '../../ec_checkout/components/index.jsx'
import Demo from '../../demo/components/index.jsx'

const Root = () => (
  <div>
    <TwitterPlus />
    <CartScape />
    <Dashboard />
    <Checkout />
    <Demo />
  </div>
)

export default Root
