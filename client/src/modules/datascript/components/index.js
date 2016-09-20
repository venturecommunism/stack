import React from 'react'

import ActionsMapper from '../../core/containers/actionsmapper'

//import Persons from '../../persons/components/persons'
import Time from '../../persons/components/time'
//jsonld
import jsonContainer from '../../persons/containers/jsoncontainer'
//import json from '../../persons/queries/persons'

const jsonQueryContainer = jsonContainer(Time)
//jsonld

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
const FollowerTree = followerTreePullQuery(ActionsMapper('followertree', FollowerTreeComponent))

const Root = () => (
  <div>
    <Time />
    <jsonQueryContainer />
    <AllUsers />
    <AllUsersFromIndex />
    <AllUserEdges />
    <FollowerTree entityIds={[['name', 'Jane']]} />
  </div>
)

export default Root
