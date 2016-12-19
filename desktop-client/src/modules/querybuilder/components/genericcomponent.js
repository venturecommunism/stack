import React from 'react'

const GenericComponent = ({ result, error }) => (
  <div style={error ? {"background-color": "red", "padding": "20px 0"} : {}} >
    <code style={error ? {"color": "white"} : {}} >
      <pre>
        {result ? JSON.stringify(result, null, 2) : JSON.stringify(error, null, 2) }
      </pre>
    </code>
  </div>
)

export default GenericComponent
