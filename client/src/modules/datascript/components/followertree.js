import React from 'react'

const FollowerTreeComponent = ({ result, actions }) => (
  <div>
    <h3>A tree of all followers under Jane </h3>
    <button onClick={ actions.addfollowerofjane }>
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
