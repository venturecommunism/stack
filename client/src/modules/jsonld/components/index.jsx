import React from 'react'

import ActionsMapper from '../../core/containers/actionsmapper'

import ImportUIComponent from '../../jsonld/components/importui.jsx'
const ActionsImportUI = ActionsMapper('importui', ImportUIComponent)

const ImportUI = () => (
  <ActionsImportUI />
)

export default ImportUI
