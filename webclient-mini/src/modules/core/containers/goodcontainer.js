import { useDeps, compose, composeAll } from 'mantra-core'

//Subscriptions = new SubsManager()

const dataComposer = ({ context, actions }, onData) => {
  const { Meteor, Collections, Store, LocalState } = context()

  const { query } = actions()

  //const error = err ? LocalState.get(err().errortype) : null

  if (Subscriptions.subscribe('feed', queries).ready()) {
    const data = {}

    const sendData = () => {
      onData(null, {
        data,
          //error,
      })
      // clearErrors when unmounting the component
      // return err ? err().clearErrors : null
    }

    sendData()
    return Store.subscribe(sendData)
  }
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
