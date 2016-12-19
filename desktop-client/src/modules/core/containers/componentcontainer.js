import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context, query }, onData) => {
  const {conn} = context()

  var find = `?user`
  var where = `[?u "name"]
               [?u "name" ?user]`

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
