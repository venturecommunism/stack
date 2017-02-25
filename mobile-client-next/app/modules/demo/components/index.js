import React from 'react'
import {View, Text} from 'react-native'

import DataContainer from '../../core/containers/datacontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

/*
import JWT from '../../clientjwt/components/jwt.jsx'
import ImportUI from '../../jsonld/components/index.jsx'

import AllUsersComponent from './allusers'
import AllUserEdgesComponent from './alluseredges'
import FollowerTreeComponent from './followertree'
*/

import allUserQuery from '../queries/alluser'
import PlainResultComponent from './plainresult'
const AllUsersDataContainer = DataContainer(ActionsMapper('followertree', PlainResultComponent))

/*
import allUserQuery from '../queries/alluser'
const AllUsers = allUserQuery(AllUsersComponent)
*/

const Demo = () => (
  <View>
<Text>Demo</Text>
<AllUsersDataContainer query={allUserQuery} />
{/*
    <JWT />
    <ImportUI />
    <AllUsers /> */}
  </View>
)

export default Demo
