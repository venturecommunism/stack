import React from 'react'

import DataContainer from '../../core/containers/datacontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import AllUsersComponent from './allusers'
import AllUserEdgesComponent from './alluseredges'
import FollowerTreeComponent from './followertree'

import allUserQuery from '../queries/alluser'

import PlainResultComponent from './plainresult'
const AllUsersDataContainer = DataContainer(PlainResultComponent)

const TimerContainerWithTimers = DataContainer(PlainResultComponent)
import timer from '../observables/timer'

const AllUsersFromIndex = DataContainer(AllUsersComponent)

const AllUserEdges = DataContainer(AllUserEdgesComponent)

const FollowerTree = ActionsMapper('chatcommands', FollowerTreeComponent)

const Demo = () => (
  <div>
    <TimerContainerWithTimers observable={timer} />
    <p>Begin pure datascript query</p>
    <AllUsersDataContainer query={allUserQuery} observable={timer} />
    <p>End pure datascript query</p>
    {/* <AllUsersFromIndex index={':eavt'} observable={timer} /> */}
    <AllUserEdges query={allUserQuery} />
    <FollowerTree entityIds={[['name', 'Jane']]} />
  </div>
)

export default Demo
