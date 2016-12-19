import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context, query }, onData) => {
  const {conn} = context()

  var find = `?e ?user ?query`
  var where = `[?e "name"]
               [?e "name" ?user]
               [?e "query" ?query]`

  let new_query = `
  [:find ${find}
   :where ${where}]`

  var db = datascript.db(conn)

  const qArgs = [new_query, db]
  let result = datascript.q(...qArgs)
  onData(null, {result})
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
