import React from 'react'

import DataContainer from '../../core/containers/datacontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import AllUsersComponent from './allusers'
import AllUserEdgesComponent from './alluseredges'
import FollowerTreeComponent from './followertree'

import allUserQuery from '../queries/alluser'

import PlainResultComponent from './plainresult'
const AllUsersDataContainer = DataContainer(PlainResultComponent)

const AllUsersFromIndex = DataContainer(AllUsersComponent)

const AllUserEdges = DataContainer(AllUserEdgesComponent)

const FollowerTree = ActionsMapper('followertree', FollowerTreeComponent)

const Demo = () => (
  <div>
    <AllUsersDataContainer query={allUserQuery} />
    <AllUsersFromIndex query={allUserQuery} />
    <AllUserEdges query={allUserQuery} />
    <FollowerTree entityIds={[['name', 'Jane']]} />
  </div>
)

export default Demo
