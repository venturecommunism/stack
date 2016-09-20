import React from 'react'

//import jsonContainer from '../containers/jsoncontainer'
//import json from '../queries/persons'

//const jsonQuery = jsonContainer(json)

const PersonsComponent = ({ json }) => (
  <div>
    {/* <jsonQuery /> */}
    <h3>A list of persons</h3>
{json.name}
{/*    <ul>
      {json.map((person) => (
        <li key={`${JSON.stringify(person)}`}>{`${JSON.stringify(person)}`}</li>
      ))}
    </ul>
*/}    {/* <button onClick={ () =>
      transact([

        actions.import()

      ])
    }>Import
    </button> */}
  </div>
)

export default PersonsComponent
