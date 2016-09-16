import React from 'react'
import {mount} from 'react-mounter'

import MainLayout from '../core/components/main_layout'
import Container from '../../modules/chat/containers/timecontainer'
import Feed from './components/index'
const FeedPage = Container(Feed)

export default function (injectDeps) {
  const MainLayoutCtx = injectDeps(MainLayout)

  mount(MainLayoutCtx, {
    content: () => (<FeedPage />)
  })
}
