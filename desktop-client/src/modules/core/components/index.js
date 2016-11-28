import React from 'react'

import TwitterPlus from '../../twitterplus/components/index'
import CartScape from '../../cartscape/components/index.jsx'
import Dashboard from '../../ec_dashboard/components/dashboard'
import Checkout from '../../ec_checkout/components/index'
import Demo from '../../demo/components/index'

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
