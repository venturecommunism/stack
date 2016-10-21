import { withDatascriptQuery } from '../../../lib/react-datascript'

/**
 * A higher order component that declares a query for returning names
 * of all users in the graph
 */
const fullScreenStateQuery = withDatascriptQuery({
  query: `
    [:find ?fullscreenstate
     :where [?e "app/fullscreenstate"]
            [?e "app/fullscreenstate" ?fullscreenstate]]`
})

export default fullScreenStateQuery
