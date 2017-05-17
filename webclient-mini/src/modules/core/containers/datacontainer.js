import { useDeps, composeAll } from 'mantra-core'
import composeWithMobx from '../libs/with_mobx'
import datascript from 'datascript'
import moment from 'moment'

const dataComposer = ({ context, query, index, counter, observable }, onData) => {
  const {conn, log} = context()

  if (observable) {
  } else {
    var observable = {}
    observable.value = new Date()
  }

  try {
    var now = moment(observable.value, 'YYYY-MM-DD-HH-mm-ss-SSS-')
    observable.time = now.format('YYYYMMDDHHmmss')
    observable.diff = observable.time - 20170404060700
  } catch (error) {
    console.log(error)
  }
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
    var result = index ? datascript.datoms(datascript.db(conn), index) : datascript.q(...qArgs)
    onData(null, {result, counter, observable})
  } catch (error) {
    onData(null, {error, counter, observable})
  }
}

export default (component) => composeAll(
  composeWithMobx(dataComposer),
  useDeps()
)(component)
