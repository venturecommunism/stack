import React from 'react'

const PlainResultComponent = ({ result }) => (
  <div>
{console.log("Result", result)}
    <h3>Peers </h3>
    <div>test: {result[0]}</div>
  </div>
)

export default PlainResultComponent
