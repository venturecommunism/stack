import React from 'react'

import DataContainer from '../../core/containers/componentcontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import jwtQuery from '../queries/storedjwt'

import SignInComponent from './signin'
const SignInDataContainer = DataContainer(ActionsMapper('updatequery', SignInComponent))

const SignIn = () => (
  <div>
    <SignInDataContainer query={jwtQuery} />
  </div>
)

export default SignIn
