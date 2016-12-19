import React from 'react'

import DataContainer from '../../core/containers/componentcontainer'

import allUserQuery from '../queries/alluser'

import PlainResultComponent from './plainresult'
const AllUsersDataContainer = DataContainer(PlainResultComponent)

const QueryBuilder = () => (
  <div>
    <AllUsersDataContainer query={allUserQuery} />
  </div>
)

export default QueryBuilder
