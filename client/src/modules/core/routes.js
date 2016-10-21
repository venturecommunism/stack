import React from 'react'
import {mount} from 'react-mounter'
import { DBConnProvider } from '../../lib/react-datascript'

import MainLayout from '../layout/components/main_layout'

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
    conn: conn
  })
}
