import React from 'react'

const GenericComponent = ({ result }) => (
  <div>
    <code>
      <pre>
        {JSON.stringify(result, null, 2)}
      </pre>
    </code>
  </div>
)

export default GenericComponent
