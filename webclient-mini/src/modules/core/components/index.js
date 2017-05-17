import React from 'react'

import logo from '../../layout/components/images/fivepetal.svg'
import '../../layout/components/styles/app.css'
import '../../layout/components/styles/index.css'

import Demo from '../../demo/components/index'
import ChatGame from '../../chatgame/components/index'
import QueryBuilder from '../../querybuilder/components/index'

const Root = ({result}) => (
  <div>{ !result ? <div>
    <div className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <h2>Under Construction</h2>
    </div>
    <p className='App-intro'>
      To get started, edit <code>src/modules/core/components/index.js</code> and save to reload.
    </p>
    <ChatGame />
    <Demo />
    <QueryBuilder />
 </div> : <div>
    <div className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
    </div>
    <p className='App-intro'>
    </p>
    </div>
    }
  </div>
)

export default Root
