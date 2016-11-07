import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context }, onData) => {
  const {conn} = context()
  console.log(conn)
  console.log(datascript)

  const result = {'this': 'whimple'}
  onData(null, {result})
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
