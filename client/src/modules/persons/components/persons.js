import React from 'react'

import PersonsQuery from '../queries/persons'

const PersonsComponent = ({ result }) => (
  <div>
    <h3>A list of persons</h3>
    <ul>
      {result.map((person) => (
        <li key={`${JSON.stringify(person)}`}>{`${JSON.stringify(person)}`}</li>
      ))}
    </ul>
  </div>
)

export default PersonsQuery(PersonsComponent)
