import React from 'react'

const PlainResultComponent = ({ result }) => (
  <div>
    {result.map( s => 
    <div>
    <h3>Component {s}</h3>
    <code>
      <pre>
        {JSON.stringify(s, null, 2)}
      </pre>
    </code>
    </div>  ) }
  </div>
)

export default PlainResultComponent
