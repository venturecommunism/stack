import { useDeps, compose, composeAll } from 'mantra-core'
import datascript, {transact} from 'datascript'

import io from 'socket.io-client'


const room = 'DataKick'
console.log('DATA CONTAINER')

        function join(roomID, socket) {
          socket.emit('join', roomID, (socketIds) =>{
            console.log('join', socketIds);
            for (var i in socketIds) {
// transact(conn, [[':db/add', -1, ':app/peer', socketIds[i]]], {'remoteuser': 'system peers'})
              var socketId = socketIds[i];
              createPC(socketId, true);
            }
          });
        }


const dataComposer = ({ context, actions }, onData) => {
  // console.log('CONTEXT', Object.keys(context()))
  // console.log('ACTIONS', actions())

    const socket = io('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});

    socket.on('connect', (data) => {
      console.log('connect');
    });

    socket.on('exchange', function(data){
      console.log('exchange')
      exchange(data);
    });

    socket.on('leave', function(socketId){
      leave(socketId);
    });

    // auto join room
    // console.log("CHANGE BACK TO: this.props.moveId")
    // console.log('this is the moveId', this.props.moveId);
    // this.join(this.props.moveId);
    join(room, socket);



  const {channel, conn, me} = context()
  
  var query = `[:find ?id
                :where [?e ":app/peer" ?id]]`
  var db = datascript.db(conn)
  const qArgs = [query, db]

  try {
    var result = datascript.q(...qArgs)

// var webrtc = createDataChannel()
//    var webrtc = peer.connect(result[0])
//    webrtc.on('open', function(){
      onData(null, {result, conn, actions: actions()})
//    })
  } catch (error) {
    var error = {error: 'Bad query.'}
    onData(null, {error})
  }
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
