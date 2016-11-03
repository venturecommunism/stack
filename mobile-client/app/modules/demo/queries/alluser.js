import { withDatascriptQuery } from '../../../lib/react-datascript'

/**
 * A higher order component that declares a query for returning names
 * of all users in the graph
 */
const allUserQuery = withDatascriptQuery({
  query: `
    [:find ?user
     :where [?u "name"]
            [?u "name" ?user]]`
})

export default allUserQuery
