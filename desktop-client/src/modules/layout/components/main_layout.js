import React from 'react'
import logo from './images/fivepetal.svg'
import './styles/app.css'
import './styles/index.css'

import Navigation from './navigation'
import Feed from '../../core/components/index'

import fullScreenQuery from '../queries/fullscreen'

import './styles/akkad.css'
import CartScape from '../../cartscape/components/index'

const Layout = ({result, conn}) => (
  <div>{ result && result.length === 0 ? <div className='App'>
    <div className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <h2>Under Construction</h2>
      <Navigation />
    </div>
    <p className='App-intro'>
      To get started, edit <code>src/modules/core/components/index.js</code> and save to reload.
    </p>
    <Feed conn={conn} />
  </div> : <CartScape />}</div>
)

export default fullScreenQuery(Layout)

