import React from 'react'

import ActionsMapper from '../../core/containers/actionsmapper'

import shoppingCartQuery from '../queries/shoppingcart'
import CheckoutComponent from './checkout'
const Checkout = shoppingCartQuery(ActionsMapper('checkout', CheckoutComponent))

export default () => (
  <Checkout />
)

