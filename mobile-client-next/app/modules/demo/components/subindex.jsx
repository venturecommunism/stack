import React from 'react'

import ActionsMapper from '../../core/containers/actionsmapper'

import JWT from '../../clientjwt/components/jwt.jsx'

import AllUsersComponent from './allusers'
import AllUserEdgesComponent from './alluseredges'
import FollowerTreeComponent from './followertree'

import ImportUI from '../../jsonld/components/importui.jsx'
const ActionsImportUI = ActionsMapper('importui', ImportUI)

import allUserQuery from '../queries/alluser'
const AllUsers = allUserQuery(AllUsersComponent)

const Subindex = () => (
  <div>
    <JWT />
    <ActionsImportUI />
    <AllUsers />
  </div>
)

export default Subindex
