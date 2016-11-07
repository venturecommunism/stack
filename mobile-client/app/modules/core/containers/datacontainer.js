import { compose, composeAll } from 'react-komposer'
import { useDeps } from 'react-simple-di'
import datascript from 'datascript'
import React from 'react'

const dataComposer = ({ context }, onData) => {
  const {conn} = context()
  console.log(conn)

  var query = `
    [:find ?user
     :where [?u "name"]
            [?u "name" ?user]]`

  const qArgs = [query, datascript.db(conn)]
  let result = datascript.q(...qArgs)
  onData(null, {result})
}

const options = {
  loadingHandler: () => (<Text>loading</Text>),
  errorHandler: e => (<Text>{e.message}</Text>),
}

export default (component) => composeAll(
  compose(dataComposer, options),
  useDeps()
)(component)
