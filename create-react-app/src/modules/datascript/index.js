import React from 'react';
import { DBConnProvider } from './react-datascript'
import createDBConn from './createDBConn';
import { AllUserEdges, AllUsers, AllUsersFromIndex, FollowerTree } from './components';

import App from './App';
import './index.css';

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
