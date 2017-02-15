import React from 'react'

import DataContainer from '../../core/containers/datacontainer'
import GenericComponent from './genericcomponent'
import InputCredentials from './inputcredentials'

const GenericComponentContainer = DataContainer(GenericComponent)

const QueryBuilderComponent = ({ result, actions }) => (
  <div>
    <InputCredentials result={result} actions={actions} />
    {result.map( s =>
      <div key={s[0]}>
        <h3>{s[0]}: {s[1]}</h3>
        <GenericComponentContainer query={s[2]} />
      </div>
    )}
  </div>
)

export default QueryBuilderComponent
