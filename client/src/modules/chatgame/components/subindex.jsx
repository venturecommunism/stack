import React from 'react'

import ActionsMapper from '../../core/containers/actionsmapper'

import JWT from '../../clientjwt/components/jwt.jsx'

import AllUsersComponent from './allusers'
import AllUserEdgesComponent from './alluseredges'
import FollowerTreeComponent from './followertree'

import ImportUI from '../../jsonld/components/importui.jsx'
const ActionsImportUI = ActionsMapper('importui', ImportUI)

import allUserQuery from '../queries/alluser'
const AllUsers = allUserQuery(AllUsersComponent)

import allUsersFromIndex from '../queries/allusersfromindex'
const AllUsersFromIndex = allUsersFromIndex(AllUsersComponent)

import allUserEdgesQuery from '../queries/alluseredges'
const AllUserEdges = allUserEdgesQuery(AllUserEdgesComponent)

import followerTreePullQuery from '../queries/followertreepull'
const FollowerTree = followerTreePullQuery(ActionsMapper('chatcommands', FollowerTreeComponent))

const Subindex = () => (
  <div>
    <JWT />
    <ActionsImportUI />
    <AllUsers />
    <AllUsersFromIndex />
    <AllUserEdges />
    <FollowerTree entityIds={[['name', 'Jane']]} />
  </div>
)

export default Subindex
