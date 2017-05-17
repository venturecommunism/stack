import React from 'react'
import {mount} from 'react-mounter'

import MainLayout from '../layout/components/main_layout'

export default function (injectDeps, context, actions) {
// conn = context.conn
  const MainLayoutCtx = function (props) {
    const MainLayoutCtx = injectDeps(MainLayout)
    return (
      <MainLayoutCtx { ...props } />
    )
  }
  mount(MainLayoutCtx)
}
