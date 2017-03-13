import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

import io from 'socket.io-client'

/************************************* SOCKET IO******************************************/

let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection;
let RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;

var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
let socket;
var pcPeers = {};

/************************************* SOCKET IO ******************************************/
const room = 'MoveKick';

    socket = io('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});

    socket.on('connect', (data) => {
      console.log('connect');
    });

    socket.on('exchange', function(data){
      console.log('exchange')
      container.exchange(data);
    });

    socket.on('leave', function(socketId){
      container.leave(socketId);
    });


//    join(room);


        function logError(error, message) {
          console.log(message + ': ', error);
        }

        //
        function join(roomID) {
          socket.emit('join', roomID, (socketIds) =>{
            console.log('join', socketIds);
            for (var i in socketIds) {
              var socketId = socketIds[i];
              createPC(socketId, true);
            }
          });
        }

        function createPC(socketId, isOffer) {
          var pc = new RTCPeerConnection(configuration);
          pcPeers[socketId] = pc;

          pc.onicecandidate = function (event) {
            console.log('onicecandidate', event);
            if (event.candidate) {
              socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
            }
          };

          function createOffer() {
            pc.createOffer(function(desc) {
              console.log('createOffer', desc);
              pc.setLocalDescription(desc, function () {
                console.log('setLocalDescription', pc.localDescription);
                socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
              }, container.logError);
            }, container.logError);
          }

          pc.onnegotiationneeded = function () {
            console.log('onnegotiationneeded');
            if (isOffer) {
              createOffer();
            }
          }

          pc.oniceconnectionstatechange = function(event) {
            console.log('oniceconnectionstatechange', event);
            if (event.target.iceConnectionState === 'connected') {
              createDataChannel();
            }
          };
          pc.onsignalingstatechange = function(event) {
            console.log('onsignalingstatechange', event);
          };

          pc.onaddstream = function (event) {
            console.log('onaddstream', event);
            let remoteStreamURL = URL.createObjectURL(event.stream);
            container.setState({ remoteStreamURL });
          };


          function createDataChannel() {
            if (pc.textDataChannel) {
              return;
            }
            var dataChannel = pc.createDataChannel("text");

            dataChannel.onerror = function (error) {
              console.log("dataChannel.onerror", error);
            };

            dataChannel.onmessage = function (event) {
              console.log("dataChannel.onmessage:", event.data);
              if (event.data === 'capture') {
                container.grabScreenshot();
              }
            };

            dataChannel.onopen = function () {
              console.log('dataChannel.onopen');
dataChannel.send('test')
            };

            dataChannel.onclose = function () {
              console.log("dataChannel.onclose");
            };

            pc.textDataChannel = dataChannel;
          }

          return pc;
        }

        // handle data exchange
        function exchange(data) {
          var fromId = data.from;
          var pc;
          if (fromId in pcPeers) {
            pc = pcPeers[fromId];
          } else {
            pc = createPC(fromId, false);
          }

          if (data.sdp) {
            console.log('exchange sdp', data);
            pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
              if (pc.remoteDescription.type == "offer")
                pc.createAnswer(function(desc) {
                  console.log('createAnswer', desc);
                  pc.setLocalDescription(desc, function () {
                    console.log('setLocalDescription', pc.localDescription);
                    socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
                  }, container.logError);
                }, container.logError);
            }, container.logError);
          } else {
            console.log('exchange candidate', data);
            pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          }
        }

        function leave(socketId) {
          console.log('leave', socketId);
          var pc = pcPeers[socketId];
          pc.close();
          delete pcPeers[socketId];
        }






const dataComposer = ({ context, actions }, onData) => {
  // console.log('CONTEXT', Object.keys(context()))
  // console.log('ACTIONS', actions())

  const {peer, channel, conn, me} = context()

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
    channel.send({id: me})
  })

  const qArgs = [query, db]
  try {
    var result = datascript.q(...qArgs)

    var webrtc = peer.connect(result[0])
//    webrtc.on('open', function(){
      onData(null, {result, webrtc, conn, Peer: peer, actions: actions()})
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
