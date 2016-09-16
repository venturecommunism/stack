import React from 'react'
import {mount} from 'react-mounter'
import { DBConnProvider } from '../../lib/react-datascript'
import createDBConn from '../../lib/createDBConn'

import Navigation from '../core/components/navigation'
import MainLayout from '../core/components/main_layout'
import Container from '../../modules/chat/containers/timecontainer'
import Feed from './components/index'
const FeedPage = Container(Feed)

export default function (injectDeps) {

  const MainLayoutCtx = function (props) {
    const MainLayoutCtx = injectDeps(MainLayout)
    return (
      <DBConnProvider conn={ createDBConn() } >
        <MainLayoutCtx { ...props } />
      </DBConnProvider>
    )
  }

  mount(MainLayoutCtx, {
    content: () => (<FeedPage />),
    links: () => (<Navigation />)
  })
}
