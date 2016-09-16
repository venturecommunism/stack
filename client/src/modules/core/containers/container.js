import { composeWithTracker, composeAll } from 'mantra-core'
import { useDeps } from '/lib/helpers/usedeps'

const collectionComposer = ({ context, query, err }, onData) => {
  const { Meteor, Collections, Store, LocalState } = context()
  const { sidebarReducer } = Store.getState()

  const error = err ? LocalState.get(err().errortype) : null

  const { connection, collection, selector, pubsort, subsort, publimit, sublimit } = query()
  var runselector = selector()

  const fields = {
    tasks: {
      _id: true,
      description: true,
      uuid: true,
      status: true,
      entry: true,
      likecount: true,
      taskcommentcount: true,
      username: true,
      created: true,
      owner: true,
      type: true,
      workflow: true,
      project: true,
      due: true,
    },
  }

  if (Meteor.subscribe('feed', fields, runselector, pubsort, publimit).ready()) {
    const data = Mongo.Collection.get(collection, { connection: connection }).find(runselector, {sort: subsort, reactive: false, limit: sublimit}).fetch()

    //console.log('Connection', connection)
    //console.log('Collection', collection)
    //console.log('Selector, RemotePublishSort, LocalSubscribeSort, PubLimit and SubLimit are', runselector, pubsort, subsort, publimit, sublimit)
    //console.log('Count', data.length)

    const sendData = () => {
      onData(null, {
        data,
        sidebarStore: sidebarReducer,
        error,
      })
      // clearErrors when unmounting the component
      return err ? err().clearErrors : null
    }

    sendData()
    return Store.subscribe(sendData)
  }
}

export default (actionset, component) => composeAll(
  composeWithTracker(collectionComposer),
  useDeps(actionset)
)(component)
