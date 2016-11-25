/**
 * A query for returning names
 * of all users in the graph
 */
export default `
  [:find ?e ?user ?tweet
   :where [?e "tweet"]
          [?e "tweet" ?tweet]
          [?e "user" ?user]]`
