import { useDeps, composeAll } from 'mantra-core'
import composeWithMobx from '../libs/with_mobx'
import datascript from 'datascript'

const dataComposer = ({ context, query, counter }, onData) => {
  const {conn, log} = context()

  var db = datascript.db(conn)

  if (log && counter && counter.value > 0 && log.length >= counter.value) {
    var slicedlog = log.slice(counter.value, log.length)
    slicedlog.forEach(function (logentry) {
      var e = logentry[0].e
      logentry.map(s => db = datascript.db_with(db, [[':db/retract', e, s.a, s.v]]))
    })
  }

  const qArgs = [query, db]
  try {
    var result = datascript.q(...qArgs)
    onData(null, {result, counter})
  } catch (error) {
    var error = {error: 'Bad query.'}
    onData(null, {error, counter})
  }
}

export default (component) => composeAll(
  composeWithMobx(dataComposer),
  useDeps()
)(component)
