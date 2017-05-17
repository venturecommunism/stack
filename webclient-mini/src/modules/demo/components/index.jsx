import React from 'react'

import DataContainer from '../../core/containers/datacontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import AllUsersComponent from './allusers'
import AllUserEdgesComponent from './alluseredges'
import FollowerTreeComponent from './followertree'

import allUserQuery from '../queries/alluser'

import PlainResultComponent from './plainresult'
const AllUsersDataContainer = DataContainer(PlainResultComponent)

const AllUsersFromIndex = AllUsersComponent

const AllUserEdges = AllUserEdgesComponent

const FollowerTree = ActionsMapper('followertree', FollowerTreeComponent)

const Demo = () => (
  <div>
    <AllUsersDataContainer query={allUserQuery} />
    <AllUsersFromIndex />
    <AllUserEdges />
    <FollowerTree entityIds={[['name', 'Jane']]} />
  </div>
)

export default Demo
