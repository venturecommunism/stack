import React from 'react'

import ActionsMapper from '../../core/containers/actionsmapper'

import shoppingCartQuery from '../../ec_checkout/queries/shoppingcart'
import CheckoutComponent from '../../ec_checkout/components/checkout.jsx'
const Checkout = shoppingCartQuery(ActionsMapper('checkout', CheckoutComponent))

export default () => (
  <div>
    <Checkout />
  </div>
)

