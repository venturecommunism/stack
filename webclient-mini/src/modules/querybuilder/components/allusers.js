import React from 'react'

const AllUsersComponent = ({ result }) => (
  <div>
    <h3> All users (every node in the graph)</h3>
    <ul>
      {result.map((user) => (
        <li key={`${JSON.stringify(user)}`}>{`${JSON.stringify(user)}`}</li>
      ))}
    </ul>
  </div>
)

export default AllUsersComponent
