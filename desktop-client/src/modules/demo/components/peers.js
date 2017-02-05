import React from 'react'

const PeersComponent = ({ result, webrtc, actions }) => (
  <div>
    <h3>Peers </h3>
    <ul>
      {result.map((peer) => (
        <li key={peer} onClick={() => actions.sendhi(peer, webrtc)} >{`${peer} is a Peer`}</li>
      ))}
    </ul>
  </div>
)

export default PeersComponent
