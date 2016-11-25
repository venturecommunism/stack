import React from 'react'

import DataContainer from '../../core/containers/datacontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import allTweetsQuery from '../queries/alltweets'

import PlainResultComponent from './plainresult'
const AllTweetsDataContainer = DataContainer(PlainResultComponent)

export default () => (
  <div>
    <AllTweetsDataContainer query={allTweetsQuery} />
  </div>
)
