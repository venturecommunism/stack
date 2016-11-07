import React from 'react'

const PlainResultComponent = ({ result }) => (
  <div>
    <h3>Stringified Result </h3>
    <code>
      <pre>
        {JSON.stringify(result, null, 2)}
      </pre>
    </code>
  </div>
)

export default PlainResultComponent
