import React from 'react'

import PeersContainer from '../../core/containers/peerscontainer'
import DataContainer from '../../core/containers/datacontainer'
import GenericComponent from './genericcomponent'
import InputCredentials from './inputcredentials'

const InputCredentialsContainer = PeersContainer(InputCredentials)
const GenericComponentContainer = DataContainer(GenericComponent)

const QueryBuilderComponent = ({ result, actions }) => (
  <div>
    <InputCredentialsContainer result={result} actions={actions} />
  </div>
)

export default QueryBuilderComponent
