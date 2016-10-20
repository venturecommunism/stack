import React from 'react'

import DynamicTextureScene from '../../dynamictexturescene/components/DynamicTextureScene.js'
import HeightMapScene from '../../heightmap/components/heightmapscene.js'
import Jenga from '../../jenga/components/index.js'
import ClickTheBoxScene from '../../babylon/components/ClickTheBoxScene.js'
import App from '../../babylon/components/box.jsx'
import Dashboard from '../../ec_dashboard/components/dashboard.jsx'
import Checkout from '../../ec_checkout/components/index.jsx'
import Demo from '../../demo/components/index.jsx'

const Root = () => (
  <div>
    <DynamicTextureScene />
    <HeightMapScene />
    <Jenga />
    <ClickTheBoxScene />
    <App />
    <Dashboard />
    <Checkout />
    <Demo />
  </div>
)

export default Root
