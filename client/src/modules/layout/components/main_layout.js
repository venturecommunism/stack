import React from 'react'
import logo from './images/fivepetal.svg'
import './styles/app.css'
import './styles/index.css'

import './styles/akkad.css'
import TriggersPage from '../../triggers/components/TriggersPage'

const Layout = ({links = () => null, content = () => null }) => (
  <div>{ true ? <div className='App'>
    <div className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <h2>Under Construction</h2>
      { links() }
    </div>
    <p className='App-intro'>
      To get started, edit <code>src/modules/core/components/index.js</code> and save to reload.
    </p>
    { content() }
  </div> : <TriggersPage />}</div>
)

export default Layout

