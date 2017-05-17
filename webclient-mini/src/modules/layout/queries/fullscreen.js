import { withDatascriptQuery } from '../../../lib/helpers/legacy/react-datascript'

/**
 * A higher order component that declares a query for returning names
 * of all users in the graph
 */
const fullScreenStateQuery = withDatascriptQuery({
  query: `
    [:find ?e ?fullscreen
     :where [?e "app/fullscreen"]
            [?e "app/fullscreen" ?fullscreen]]`
})

export default fullScreenStateQuery
