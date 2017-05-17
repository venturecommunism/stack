import React from 'react'
import './styles/app.css'
import './styles/index.css'

import Feed from '../../core/components/index'

import fullScreenQuery from '../queries/fullscreen'

const Layout = ({result, conn}) => (
  <div><div className='App'><Feed conn={conn} /></div></div>
)

export default fullScreenQuery(Layout)

