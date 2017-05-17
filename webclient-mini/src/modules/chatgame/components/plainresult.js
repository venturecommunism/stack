import React from 'react'

const PlainResultComponent = ({ result, observable }) => (
  <div>
    <h3>{observable.diff} Timer {observable.time}</h3>
    <code>
      <pre>
        {JSON.stringify(result, null, 2)}
      </pre>
    </code>
  </div>
)

export default PlainResultComponent
