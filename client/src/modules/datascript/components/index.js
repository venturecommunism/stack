import React from 'react'
import { DBConnProvider } from '../../../lib/react-datascript'
import createDBConn from '../../../lib/createDBConn'
import { AllUserEdges, AllUsers, AllUsersFromIndex, FollowerTree } from './components'

import App from './App'
import './styles/index.css'

const Root = () => (
  <DBConnProvider conn={createDBConn()}>
    <div>
      <App />
      <AllUsers />
      <AllUsersFromIndex />
      <AllUserEdges />
      <FollowerTree entityIds={[['name', 'Jane']]} />
    </div>
  </DBConnProvider>
)

export default Root
