import React from 'react'

import ActionsMapper from '../../core/containers/actionsmapper'

import Dashboard from '../../ec_dashboard/components/dashboard.jsx'

import shoppingCartQuery from '../../ec_checkout/queries/shoppingcart'
import CheckoutComponent from '../../ec_checkout/components/checkout.jsx'
const Checkout = shoppingCartQuery(ActionsMapper('checkout', CheckoutComponent))

//import Subindex from './subindex'

const Root = () => (
  <div>
    <Dashboard />
    <Checkout />
    {/* <Subindex /> */}
  </div>
)

export default Root
