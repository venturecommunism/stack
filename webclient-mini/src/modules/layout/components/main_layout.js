import React from 'react'
import './styles/app.css'
import './styles/index.css'

import Feed from '../../core/components/index'

const Layout = ({result, conn}) => (
  <div><div className='App'><Feed conn={conn} /></div></div>
)

export default Layout

