import React from 'react'

import {
  View
} from 'react-native'

import DataContainer from '../../core/containers/datacontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import allTweetsQuery from '../queries/alltweets'

import PlainResultComponent from './plainresult'
const AllTweetsDataContainer = DataContainer(PlainResultComponent)

export default () => (
  <View>
    <AllTweetsDataContainer query={allTweetsQuery} />
  </View>
)
