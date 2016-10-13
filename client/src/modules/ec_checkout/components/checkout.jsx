import React from 'react'

export default ({actions}) => (
  <div>
    <h2>Checkout component</h2>
    <button onClick={actions.buy}>Buy</button>
  </div>
)
