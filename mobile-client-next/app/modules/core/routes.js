import React from 'react';

import { DBConnProvider } from '../../lib/dbConnProvider'

import DrawerLayout from './containers/DrawerLayout';

import MainPage from './components/MainPage';
import AddEntryPage from './components/AddEntryPage';
import SignInPage from './containers/SignInPage';

export default function (injectDeps, { AppRegistry, Scene, Router }, context, actions) {
  const conn = context.conn
  const App = () => (
    <Router>
      <Scene key="drawer" initial component={DrawerLayout}>
        <Scene key="root" hideNavBar>
          <Scene
            key="main"
            initial
            component={MainPage}
          />
          <Scene
            key="addEntry"
            disableDrawer
            component={AddEntryPage}
            title="Add Entry"
          />
          <Scene
            key="signIn"
            type="replace"
            disableDrawer
            hideNavBar
            component={SignInPage}
          />
        </Scene>
      </Scene>
    </Router>
  );

  const AppCtx = injectDeps(App);
  AppRegistry.registerComponent('RCTWebRTCDemo', () => AppCtx);
}
