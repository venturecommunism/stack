import React from 'react'

const Layout = ({content = () => null }) => (
  <div>
    {content()}
  </div>
)

export default Layout
