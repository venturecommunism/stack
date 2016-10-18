import { withDatascriptQuery } from '../../../lib/react-datascript'

/**
 * A higher order component that declares a query using a recursive rule
 * for listing out all edges in the user graph
 */
const allUserEdgesQuery = withDatascriptQuery({
  query: `
    [:find ?user1 ?user2
     :in $ %
     :where (follows ?u1 ?u2)
             [?u1 "name" ?user1]
             [?u2 "name" ?user2]]`,
  rules: `
    [[(follows ?e1 ?e2)
       [?e1 "follows" ?e2]]
      [(follows ?e1 ?e2)
       [?e1 "follows" ?t]
       (follows ?t ?e2)]]`
})

export default allUserEdgesQuery
