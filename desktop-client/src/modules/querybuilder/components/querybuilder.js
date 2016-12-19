import React from 'react'

const QueryBuilderComponent = ({ result }) => (
  <div>
    {result.map( s => 
    <div>
    <input defaultValue={s[1]} />
    <div></div>
    <textarea defaultValue={s[2]} rows="8" cols="45" />
    <h3>{s[0]}: {s[1]}</h3>
    <code>
      <pre>
        {JSON.stringify(s, null, 2)}
      </pre>
    </code>
    </div>  ) }
  </div>
)

export default QueryBuilderComponent
