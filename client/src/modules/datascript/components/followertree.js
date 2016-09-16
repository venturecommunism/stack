import React from 'react'

const FollowerTreeComponent = ({ result, conn, actions }) => (
  <div>
    <h3>A tree of all followers under Jane </h3>
{console.log("the connection", conn)}
    <button onClick={

      actions.addfollowerofjane.bind(this)

          }>
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
