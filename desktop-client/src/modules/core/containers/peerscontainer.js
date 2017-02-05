import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context }, onData) => {
  const {peer, channel, conn} = context()

  peer.on('connection', connect)
  peer.on('error', function(err) {
    console.log(err)
  })

  var connectedPeers = {}

  // Handle a connection object.
  function connect(c) {
      c.on('data', function(data) {
        console.log("Incoming Data:", data)
        })

    // Handle a chat connection.
    if (c.label === 'chat') {
      console.log(c.peer)
      c.on('close', function() {
        delete connectedPeers[c.peer]
      })
    } else if (c.label === 'file') {
      c.on('data', function(data) {
        // If we're getting a file, create a URL for it.
        if (data.constructor === ArrayBuffer) {
          var dataView = new Uint8Array(data)
          var dataBlob = new Blob([dataView])
          var url = window.URL.createObjectURL(dataBlob)
          console.log(url)
        }
      })
    }
    connectedPeers[c.peer] = 1
  }

  var query = `[:find ?id
                :where [?e ":app/peer" ?id]]`

  var db = datascript.db(conn)

  peer.on('open', function(id){
    channel.send({id: id})
  })

  const qArgs = [query, db]
  try {
    var result = datascript.q(...qArgs)

    var webrtc = peer.connect(result[0])
    webrtc.on('open', function(){
      onData(null, {result, webrtc})
    })
  } catch (error) {
    var error = {error: 'Bad query.'}
    onData(null, {error})
  }
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
