import React from 'react'

export default ({result, actions}) => (
  <div>
    <h2>Shopping cart</h2>
    <code>
      <pre>
        {JSON.stringify(result, null, 2)}
      </pre>
    </code>
    <button onClick={actions.buy}>Buy</button>
  </div>
)
