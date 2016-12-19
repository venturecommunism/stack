import React from 'react'

import DataContainer from '../../core/containers/componentcontainer'

import allUserQuery from '../queries/alluser'

import QueryBuilderComponent from './querybuilder'
const AllUsersDataContainer = DataContainer(QueryBuilderComponent)

const QueryBuilder = () => (
  <div>
    <AllUsersDataContainer query={allUserQuery} />
  </div>
)

export default QueryBuilder
