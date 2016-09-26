import React from 'react'

import ActionsMapper from '../../core/containers/actionsmapper'

import AllUsersComponent from './allusers'
import AllUserEdgesComponent from './alluseredges'
import FollowerTreeComponent from './followertree'

import Button from '../../jsonld/components/button.jsx'
const ActionsButton = ActionsMapper('button', Button)

import allUserQuery from '../queries/alluser'
const AllUsers = allUserQuery(AllUsersComponent)

import allUsersFromIndex from '../queries/allusersfromindex'
const AllUsersFromIndex = allUsersFromIndex(AllUsersComponent)

import allUserEdgesQuery from '../queries/alluseredges'
const AllUserEdges = allUserEdgesQuery(AllUserEdgesComponent)

import followerTreePullQuery from '../queries/followertreepull'
const FollowerTree = followerTreePullQuery(ActionsMapper('followertree', FollowerTreeComponent))

const Root = () => (
  <div>
    <ActionsButton />
    <AllUsers />
    <AllUsersFromIndex />
    <AllUserEdges />
    <FollowerTree entityIds={[['name', 'Jane']]} />
  </div>
)

export default Root
