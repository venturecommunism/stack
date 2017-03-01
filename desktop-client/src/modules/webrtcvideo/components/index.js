import React from 'react'

import PeersContainer from '../../core/containers/peerscontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import AudioVideoComponent from './webrtcvideo'
const AudioVideoContainer = PeersContainer(ActionsMapper('peers', AudioVideoComponent))

const Demo = () => (
  <div>
    <AudioVideoContainer />
  </div>
)

export default Demo
