import React from 'react'

import DataContainer from '../../core/containers/datacontainer'
import GenericComponent from './genericcomponent'

const GenericComponentContainer = DataContainer(GenericComponent)

const QueryBuilderComponent = ({ result }) => (
  <div>
    <input defaultValue={result[0][1]} />
    <div></div>
    <textarea defaultValue={result[0][2]} rows="8" cols="45" />
    {result.map( s => 
      <div>
      <h3>{s[0]}: {s[1]}</h3>
      <GenericComponentContainer query={s[2]} />
      </div>
    )}
  </div>
)

export default QueryBuilderComponent
