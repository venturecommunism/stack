import { useDeps, compose, composeAll } from 'mantra-core'
import composeWithMobx from '../libs/with_mobx'
import datascript from 'datascript'

const dataComposer = ({ context, query, counter }, onData) => {
  const {conn, log} = context()

  if (log && counter && counter.value > 0 && log.length > counter.value) {
    var bool = true
  } else {
    var bool = false
  }
  console.log("LOGLENGTH", log.length)
  console.log("BOOL", bool)
  counter ? console.log("COUNTER VALUE", counter.value) : ''

  var tx_whole = []

  if (bool) {

    log.reverse().forEach(function (logentry) {
      //console.log("logentry", logentry)
      var e = logentry[0].e
      logentry.map(s => tx_whole.push([':db/retract', e, s.a, s.v]))
//      var tx_part = [':db/retract', e, s.a, s.v]
//      console.log(tx_part)
//      tx_whole.push(tx_part)
    })

    var elem = counter ? log[log.length-1-counter.value] : log[log.length-1]

    console.log("ELEM", elem)
    var e = elem && counter ? log[log.length-1-counter.value][0].e : ''

    console.log("E", e)
    elem ? console.log("LOG ITEM", elem.map(s => elem[s.a] = s.v)) : ''
    counter ? console.log("COUNTER VALUE", counter.value) : ''

    var tx = elem ? elem.map(s => elem[s.a] = s.v) : ''
    console.log("EG", [[':db/retract', e, ...tx]])
    console.log("COMPARE EG", tx_whole)
  }


  var db = bool ? datascript.db_with(datascript.db(conn), [tx_whole[0]]) : datascript.db(conn)

  const qArgs = [query, db]
  let result = datascript.q(...qArgs)
console.log("RESULT", result)
  onData(null, {result, counter})
}

export default (component) => composeAll(
  composeWithMobx(dataComposer),
  useDeps()
)(component)
