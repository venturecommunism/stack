import React from 'react'

const PlainResultComponent = ({ result, time }) => (
  <div>
    <h3>Stringified Result {time}</h3>
    <code>
      <pre>
        {JSON.stringify(result, null, 2)}
      </pre>
    </code>
  </div>
)

export default PlainResultComponent
