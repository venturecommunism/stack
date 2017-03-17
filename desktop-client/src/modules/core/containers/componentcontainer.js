import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context, query }, onData) => {
  var db = datascript.db(context().conn)

  var index = JSON.stringify(datascript.datoms(db, ':eavt'))
  console.log('INDEX', index)


  var find = `?e ?title ?query`
  var where = `[?e "name"]
               [?e "name" ?title]
               [?e "query" ?query]`

  let component_query = `
  [:find ${find}
   :where ${where}]`

  let result = datascript.q(component_query, db)

  onData(null, {result, index})
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
