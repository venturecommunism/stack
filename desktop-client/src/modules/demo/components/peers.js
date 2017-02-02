import React from 'react'

const PeersComponent = ({ result }) => (
  <div>
    <h3>Peers </h3>
    <ul>
      {result.map((peer) => (
        <li key={peer}>{`${peer} is a Peer`}</li>
      ))}
    </ul>
  </div>
)

export default PeersComponent
