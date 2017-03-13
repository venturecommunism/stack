import React from 'react'

// import RnDataContainer from '../../core/containers/rncontainer'
// import AudioVideoContainer from '../../core/containers/audiovideocontainer'
// import PeersContainer from '../../core/containers/peerscontainer'
import DataContainer from '../../core/containers/datacontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import JWT from '../../clientjwt/components/jwt'
import ImportUI from '../../jsonld/components/index.jsx'

import AllUsersComponent from './allusers'
import AllUserEdgesComponent from './alluseredges'
import FollowerTreeComponent from './followertree'

import allUserQuery from '../queries/alluser'

// import AudioVideoComponent from './audiovideo'
// const AudioVideo = AudioVideoContainer(ActionsMapper('peers', AudioVideoComponent))

import PeersComponent from './peers'
// const AllPeersContainer = PeersContainer(ActionsMapper('peers', PeersComponent))

import PlainResultComponent from './plainresult'
const AllUsersDataContainer = DataContainer(PlainResultComponent)

// const RnData = RnDataContainer(PlainResultComponent)

import allUsersFromIndex from '../queries/allusersfromindex'
const AllUsersFromIndex = allUsersFromIndex(AllUsersComponent)

import allUserEdgesQuery from '../queries/alluseredges'
const AllUserEdges = allUserEdgesQuery(AllUserEdgesComponent)

import followerTreePullQuery from '../queries/followertreepull'
const FollowerTree = followerTreePullQuery(ActionsMapper('followertree', FollowerTreeComponent))

const Demo = () => (
  <div>
{ console.log('index.jsx') }
    {/* <AudioVideo /> */}
    {/* <AllPeersContainer /> */}
    <AllUsersDataContainer query={allUserQuery} />
    {/* <RnData /> */}
    <JWT />
    <ImportUI />
    <AllUsersFromIndex />
    <AllUserEdges />
    <FollowerTree entityIds={[['name', 'Jane']]} />
  </div>
)

export default Demo
