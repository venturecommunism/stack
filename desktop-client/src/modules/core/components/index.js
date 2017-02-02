import React from 'react'

import QueryBuilder from '../../querybuilder/components/index'
import TwitterPlus from '../../twitterplus/components/index'
//import CartScape from '../../cartscape/components/index'
import Dashboard from '../../ec_dashboard/components/dashboard'
import Checkout from '../../ec_checkout/components/index'
import Demo from '../../demo/components/index'

const Root = () => (
  <div>
    <Demo />
    <QueryBuilder />
    <TwitterPlus />
    {/* <CartScape /> */}
    <Dashboard />
    <Checkout />
  </div>
)

export default Root
