import React from 'react'
import {View, Text} from 'react-native'

/*
import ActionsMapper from '../../core/containers/actionsmapper'

import JWT from '../../clientjwt/components/jwt.jsx'
import ImportUI from '../../jsonld/components/index.jsx'
*/

import AllUsersComponent from './allusers'
import AllUserEdgesComponent from './alluseredges'
import FollowerTreeComponent from './followertree'

import allUserQuery from '../queries/alluser'
const AllUsers = allUserQuery(AllUsersComponent)

import allUsersFromIndex from '../queries/allusersfromindex'
const AllUsersFromIndex = allUsersFromIndex(AllUsersComponent)

import allUserEdgesQuery from '../queries/alluseredges'
const AllUserEdges = allUserEdgesQuery(AllUserEdgesComponent)

/*
import followerTreePullQuery from '../queries/followertreepull'
const FollowerTree = followerTreePullQuery(ActionsMapper('followertree', FollowerTreeComponent))
*/

const Demo = () => (
  <View>
<Text>Demo</Text>
{/*
    <JWT />
    <ImportUI /> */}
    <AllUsers />
    <AllUsersFromIndex />
    <AllUserEdges />
{/*
    <FollowerTree entityIds={[['name', 'Jane']]} /> */}
  </View>
)

export default Demo
