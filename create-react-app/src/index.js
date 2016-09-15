import React from 'react';
import ReactDOM from 'react-dom';
import { DBConnProvider } from './dbConnProvider'
import createDBConn from './createDBConn';
import { AllUserEdges, AllUsers, AllUsersFromIndex, FollowerTree } from './components';

import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
