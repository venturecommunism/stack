import React from 'react'
import {mount} from 'react-mounter'
import { DBConnProvider } from '../../lib/react-datascript'

import Navigation from '../layout/components/navigation'
import MainLayout from '../layout/components/main_layout'
import Container from '../../modules/sockets/containers/timecontainer'
import Feed from './components/index'
const FeedPage = Container(Feed)

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
    content: () => (<FeedPage conn={ conn } />),
    links: () => (<Navigation />)
  })
}
