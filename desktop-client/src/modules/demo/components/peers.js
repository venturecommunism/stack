import React from 'react'

const PlainResultComponent = ({ peers }) => (
  <div>
{console.log("Peers", peers)}
    <h3>Peers </h3>
    <div>test: {peers[0]}</div>
  </div>
)

export default PlainResultComponent
