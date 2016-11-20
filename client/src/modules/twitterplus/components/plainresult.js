import React from 'react'

export default ({ result }) => (
  <div>
    <h3>Twitter Stream</h3>
    <ul>
      {result.reverse().map(([e, user, tweet]) => (
        <li key={e}>
          <div>{`@${user} said:`}</div>
          <div>{`${tweet}`}</div>
          <p></p>
        </li>
      ))}
    </ul>
  </div>
)
