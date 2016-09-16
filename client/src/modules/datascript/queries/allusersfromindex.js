import datascript from 'datascript'
import { withDatascriptQuery } from '../../../lib/react-datascript'

/**
 * A higher order component that provides low level access to the
 * underlying connection object.
 *
 * This could be used for instance to perform lookups
 * on raw indexes (with the .datoms() api which accepts:
 *
 *  - the current db
 *
 *  - a string signifying the index type
 *
 *  - an optional final argument to narrow the items
 *    retrieved from the index to a particular value
 *
 *  (See http://docs.datomic.com/clojure/#datomic.api/datoms for more information)
 *  In most cases, this can be seen as a performance "escape hatch" when regular
 *  static datalog queries are not performant enough (which they should be in the majority of cases)
 *
 * In this example we retrieve all entities in the db that have an associated
 * `name` attribute)
 */
const allUsersFromIndex = withDatascriptQuery({
  dbConn: (conn) => (
    datascript.datoms(datascript.db(conn), ':aevt', 'name')
  )
})

export default allUsersFromIndex
