import React from 'react'

import DataContainer from '../../core/containers/datacontainer'
import GenericComponent from './genericcomponent'
import UpdateQuery from './updatequery'

const GenericComponentContainer = DataContainer(GenericComponent)

const QueryBuilderComponent = ({ result, actions, index, pull }) => (
  <div>
<div>proper ds pull: {pull}</div>
<div>proper ds index: {index} </div>
    <UpdateQuery result={result} actions={actions} />
    {result.map( s =>
      <div key={s[0]}>
      <h3>{s[0]}: {s[1]}</h3>
      <GenericComponentContainer query={s[2]} />
      </div>
    )}
  </div>
)

export default QueryBuilderComponent
