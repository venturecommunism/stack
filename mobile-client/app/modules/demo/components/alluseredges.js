import React from 'react'

const AllUserEdgesComponent = ({ result }) => (
  <div>
    <h3> All follower pairs (every edge in the graph)</h3>
    <ul>
      {result.map(([user1, user2]) => (
        <li key={user1 + user2}>{`${user1} follows ${user2}`}</li>
      ))}
    </ul>
  </div>
)

export default AllUserEdgesComponent
