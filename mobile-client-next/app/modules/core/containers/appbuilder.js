import { compose, composeAll } from 'react-komposer'
import { useDeps } from 'react-simple-di'
import datascript from 'datascript'
// React and {Text} are needed for error handling. Also can't use mantra-core for same reason.
import React from 'react'
import {Text} from 'react-native'

import multisort from '../lib/multisort'

const dataComposer = ({ context, moduleid }, onData) => {
  // pull in the datascript connection and log of previous transactions from the context (see mantra spec for what the context is)
  const {conn, conn_components, log} = context()

  // get the database from the connection
  var db = datascript.db(conn)
  var db_components = datascript.db(conn_components)

  // a query to pull in the module, its root component and its data query. more later.
  // TODO: datomic get-else would make the logic of this container easier but it's not working on javascript version of datascript.
  const cQuery = `
    [:find ?query ?sortfields ?sortorders
     :where [?e2 "query" ?query]
            [?e2 "sortfields" ?sortfields]
            [?e2 "sortorders" ?sortorders]
            [?e2 "componentid" ?compid]
            [?e "rootcomponent" ?e2]
            [?e "moduleid" "${moduleid}"]]`

  // arguments to a components query
  const cArgs = [cQuery, db_components]
  // fetching the query you actually want from the query about components

  const compquery = datascript.q(...cArgs)
  const query = compquery && compquery[0] && compquery[0][0] ? compquery[0][0] : null
  const sortfields = query ? JSON.parse("[" + compquery[0][1].substring(1).slice(0,-1).split(",") + "]") : null
  const sortorders = query ? compquery[0][2].substring(1).slice(0,-1).split(",") : null
  // recursive multidimensional array sort being formed. TODO: change the structure to match datascript output (arrays all the way down)


  try {
    // pull query to pull components off of something with components name Root

    const pullfields = `
      "componentsname", "componentstype", "componentsfunction", "placeholder"
    `
    const pullquery = `
      [:find (pull $x ?e [` + pullfields + `, {"_componentsparents" ...}])
       :in $x
       :where [$x ?e "componentid" "${moduleid}"]]
    `
    var pullcomponents = datascript.q(...[pullquery, db_components])[0]
    var result = sortfields && sortorders ? multisort.arr.multisort(datascript.q(...[query, db]), sortfields, sortorders) : ["LONE_DATOM"]

    var moduleroot = new Array()
    for (var i = 0; i < result.length; i++) {
      var singlecomponent = new Array()
      var l = 0
      for (var k = 0; k < pullcomponents[0]._componentsparents.length; k++) {
        pullcomponents[0]._componentsparents[k].componentstype == 'data' ? singlecomponent.push(result[i][l]) && l++ : singlecomponent.push(pullcomponents[0]._componentsparents[k])
      }
      moduleroot.push(singlecomponent)
    }
    onData(null, {result, moduleroot, title: pullcomponents[0].componentsname})
  } catch (error) {
    alert(error)
    onData(null, {error})
  }
}

const options = {
  loadingHandler: () => (<Text>loading</Text>),
  errorHandler: e => (<Text>{e.message}</Text>),
}

export default (component) => composeAll(
  compose(dataComposer, options),
  useDeps()
)(component)

