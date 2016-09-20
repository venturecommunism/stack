import React from 'react'

import ActionsMapper from '../../core/containers/actionsmapper'

import SimpleStringifyComponent from '../../jsonld/components/stringify'
import SimpleStringComponent from '../../jsonld/components/stringdata'

import JSONLDExpandContainer from '../../jsonld/containers/jsonldexpandcontainer'
import RDFContainer from '../../jsonld/containers/rdfcontainer'

const JSONContainer = JSONLDExpandContainer(SimpleStringifyComponent)
const TriplesContainer = RDFContainer(SimpleDataComponent)

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
    <JSONContainer />
    <TriplesContainer />
    <AllUsers />
    <AllUsersFromIndex />
    <AllUserEdges />
    <FollowerTree entityIds={[['name', 'Jane']]} />
  </div>
)

export default Root
