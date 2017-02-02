import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context }, onData) => {
  const {peer, peers, channel, conn} = context()

  var query = `[:find ?id
                :where [?e ":app/peer"]
                       [?e ":app/peer" ?id]]`

  var db = datascript.db(conn)

  peer.on('open', function(id){
    console.log("CONTAINER OPEN", id)
    channel.send({id: id})
  })

  const qArgs = [query, db]
  try {
    var result = datascript.q(...qArgs)
    console.log("IDS IN CONTAINER", peers.length)
    onData(null, {result})
  } catch (error) {
    var error = {error: 'Bad query.'}
    onData(null, {error})
  }
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
