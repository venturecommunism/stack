import React from 'react'

import DataContainer from '../../core/containers/datacontainer'
import GenericComponent from './genericcomponent'
import InputCredentials from './inputcredentials'

const GenericComponentContainer = DataContainer(GenericComponent)

const QueryBuilderComponent = ({ result, actions }) => (
  <div>
    <InputCredentials result={result} actions={actions} />
  </div>
)

export default QueryBuilderComponent
