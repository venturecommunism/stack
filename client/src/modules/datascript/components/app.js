import React, { Component } from 'react'
import logo from './images/fivepetal.svg'
import './styles/app.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Under Construction</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/modules/datascript/components/app.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
