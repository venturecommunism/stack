import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context }, onData) => {
  const {peers} = context()

  try {
    console.log("IDS IN CONTAINER", peers.length)
    onData(null, {peers})
  } catch (error) {
    var error = {error: 'Bad query.'}
    onData(null, {error})
  }
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
