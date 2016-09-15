import React from 'react';
import ReactDOM from 'react-dom';
import { DBConnProvider } from './react-datascript'
import createDBConn from './createDBConn';
import { AllUserEdges, AllUsers, AllUsersFromIndex, FollowerTree } from './components';

//import BurgerMenu from './components/burger_menu'

import App from './App';

const Root = () => (
  <DBConnProvider conn={createDBConn()}>
    <div>
      {/* <BurgerMenu /> */}
      <App />
      <AllUsers />
      <AllUsersFromIndex />
      <AllUserEdges /> 
      <FollowerTree entityIds={[['name', 'Jane']]} />
    </div>
  </DBConnProvider>
)

export default Root

//ReactDOM.render(<Root />, document.getElementById('root'));

