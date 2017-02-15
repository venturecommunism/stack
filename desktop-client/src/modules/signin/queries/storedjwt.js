/**
 * A query for returning names
 * of all users in the graph
 */
const allUserQuery = `
  [:find ?user
   :where [?u "name"]
          [?u "name" ?user]]`

export default allUserQuery
