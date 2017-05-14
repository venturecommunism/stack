import React from 'react'

import DataContainer from '../../core/containers/componentcontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import allUserQuery from '../queries/alluser'

import QueryBuilderComponent from './querybuilder'
const AllUsersDataContainer = DataContainer(ActionsMapper('updatequery', QueryBuilderComponent))

const QueryBuilder = () => (
  <div>
    <AllUsersDataContainer query={allUserQuery} />
  </div>
)

export default QueryBuilder
