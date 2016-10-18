import React from 'react'
import {mount} from 'react-mounter'
import { DBConnProvider } from '../../lib/react-datascript'

import Navigation from '../layout/components/navigation'
import MainLayout from '../layout/components/main_layout'
import Feed from './components/index'

export default function (injectDeps, context, actions) {
  const conn = context.conn
  const MainLayoutCtx = function (props) {
    const MainLayoutCtx = injectDeps(MainLayout)
    return (
      <DBConnProvider conn={ conn } >
        <MainLayoutCtx { ...props } />
      </DBConnProvider>
    )
  }
  mount(MainLayoutCtx, {
    content: () => (<Feed conn={ conn } />),
    links: () => (<Navigation />)
  })
}