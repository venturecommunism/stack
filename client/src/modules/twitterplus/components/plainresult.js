import React from 'react'

function Comparator(a, b) {
   if (a[0] < b[0]) return 1
   if (a[0] > b[0]) return -1
   return 0
}

export default ({ result }) => (
  <div>
    <h3>Twitter Stream</h3>
    <ul>
      {result.sort(Comparator).slice(0,5).map(([e, user, tweet]) => (
        <li key={e}>
          <div>{`@${user} said:`}</div>
          <div>{`${tweet}`}</div>
          <p></p>
        </li>
      ))}
    </ul>
  </div>
)
