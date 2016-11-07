import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context }, onData) => {
  const {conn} = context()

  var query = `
    [:find ?user
     :where [?u "name"]
            [?u "name" ?user]]`

  const qArgs = [query, datascript.db(conn)]
  let result = datascript.q(...qArgs)
  onData(null, {result})
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
