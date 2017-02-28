import React from 'react'
import logo from './images/fivepetal.svg'
import './styles/app.css'
import './styles/index.css'

import Feed from '../../core/components/index'
import DataContainer from '../../core/containers/datacontainer'

import fullScreenQuery from '../queries/fullscreen'

import './styles/akkad.css'
// import CartScape from '../../cartscape/components/index'

const Layout = ({result, conn}) => (
  <div><div className='App'><Feed conn={conn} /></div></div>
)

export default fullScreenQuery(Layout)

