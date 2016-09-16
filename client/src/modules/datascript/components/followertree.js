import React from 'react'

const FollowerTreeComponent = ({ result, transact }) => (
  <div>
    <h3>A tree of all followers under Jane </h3>
    <button onClick={() => (
      transact([{
        ':db/id': -1,
        name: `Follower of Jane ${new Date().getTime()}`,
        follows: ['name', 'Jane']
      }]))}>
      Add follower
    </button>
    <code>
      <pre>
        {JSON.stringify(result, null, 2)}
      </pre>
    </code>
  </div>
)

export default FollowerTreeComponent
