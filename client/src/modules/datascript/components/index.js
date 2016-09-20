import React from 'react'

import ActionsMapper from '../../core/containers/actionsmapper'

import SimpleDataComponent from '../../jsonld/components/data'
import SimpleStringifyComponent from '../../jsonld/components/stringify'

import RDFContainer from '../../jsonld/containers/rdfcontainer'
import JSONLDExpandContainer from '../../jsonld/containers/jsonldexpandcontainer'

const TriplesContainer = RDFContainer(SimpleDataComponent)
const JSONContainer = JSONLDExpandContainer(SimpleStringifyComponent)

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
    <TriplesContainer />
    <JSONContainer />
    <AllUsers />
    <AllUsersFromIndex />
    <AllUserEdges />
    <FollowerTree entityIds={[['name', 'Jane']]} />
  </div>
)

export default Root
