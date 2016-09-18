import { withDatascriptQuery } from '../../../lib/react-datascript'

/**
 * A higher order component that declares a query for returning names
 * of all users in the graph
 */
const PersonsQuery = withDatascriptQuery({
  query: `
    [:find ?person
     :where [?u "name"]
            [?u "name" ?person]]`
})

export default PersonsQuery
