import { withDatascriptQuery } from '../../../lib/react-datascript'

/**
 * A higher order component that declares a query for returning names
 * of all users in the graph
 */
const fullScreenStateQuery = withDatascriptQuery({
  query: `
    [:find ?e ?credentials
     :where [?e "app/credentials"]
            [?e "app/credentials" ?credentials]]`
})

export default fullScreenStateQuery
