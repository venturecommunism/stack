import React from 'react'
import { DBConnProvider } from '../../../lib/react-datascript'
import createDBConn from '../../../lib/createDBConn'

import AllUsersComponent from './allusers'
import AllUserEdgesComponent from './alluseredges'
import FollowerTreeComponent from './followertree'

import allUserQuery from '../queries/alluser'
const AllUsers = allUserQuery(AllUsersComponent)

import allUsersFromIndex from '../queries/allusersfromindex'
const AllUsersFromIndex = allUsersFromIndex(AllUsersComponent)

import allUserEdgesQuery from '../queries/alluseredges'
const AllUserEdges = allUserEdgesQuery(AllUserEdgesComponent)

import followerTreePullQuery from '../queries/followertreepull'
const FollowerTree = followerTreePullQuery(FollowerTreeComponent)

const Root = () => (
  <DBConnProvider conn={createDBConn()}>
    <div>
      <AllUsers />
      <AllUsersFromIndex />
      <AllUserEdges />
      <FollowerTree entityIds={[['name', 'Jane']]} />
    </div>
  </DBConnProvider>
)

export default Root
