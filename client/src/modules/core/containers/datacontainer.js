import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context, query }, onData) => {
  const {conn, log} = context()

  var elem = log[log.length-1]

  elem ? console.log("ENTITY ID", log[log.length-1][0].e) : ''

  var e = elem ? log[log.length-1][0].e : ''
  elem ? console.log("LOG ITEM", elem.map(s => elem[s.a] = s.v)) : ''

  var db = elem ? datascript.db_with(datascript.db(conn), [[
    ':db/retract',
    1,
    'name',
    'John'
  ]]) : datascript.db(conn)

  const qArgs = [query, db]
  let result = datascript.q(...qArgs)
  onData(null, {result})
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
