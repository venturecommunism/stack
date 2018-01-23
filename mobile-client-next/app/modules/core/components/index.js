import React from 'react'
import {
  View
} from 'react-native'

import DataContainer from '../../core/containers/appbuilder'
import ActionsMapper from '../containers/actionsmapper'
import RecursiveComponent from './component'
const Module = DataContainer(ActionsMapper('general', RecursiveComponent))
const CreateTaskModule = DataContainer(ActionsMapper('createtaskactions', RecursiveComponent))

const Root = ({result}) => (
  <View>
    <Module moduleid={"newrootcore"} />
    <CreateTaskModule moduleid={"createtask"} />
    <Module moduleid={"core"} />
    <Module moduleid={"servercore"} />
  </View>
)

export default Root
