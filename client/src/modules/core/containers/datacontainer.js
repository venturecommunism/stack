import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context, query }, onData) => {
  const {conn, log} = context()

  var elem = log[log.length-1]

  elem ? console.log(elem.map(s => elem[s.a] = s.v)) : ''
  var db = elem ? datascript.db_with(datascript.db(conn), [[
      ':db/retract',
      1,
      'name',
      'John'
    ]]) : datascript.db(conn) 

  elem ? console.log("irregular", 
    datascript.db_with(datascript.db(conn), [[
      ':db/retract',
      1,
      'name',
      'John'
    ]])
  ) : console.log("regular", datascript.db(conn))

  const qArgs = [query, db]
  let result = datascript.q(...qArgs)
  onData(null, {result})
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
