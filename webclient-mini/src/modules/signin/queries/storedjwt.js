/**
 * A query for returning names
 * of all users in the graph
 */
const allUserQuery = `
  [:find ?creds
   :where [?u "app/credentials"]
          [?u "app/credentials" ?creds]]`

export default allUserQuery
