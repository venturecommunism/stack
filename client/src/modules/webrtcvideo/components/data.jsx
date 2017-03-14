import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});

/************************************* SOCKET IO******************************************/ 

let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection;
let RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;

var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
let container;
const pcPeers = {};

/************************************* SOCKET IO ******************************************/ 
const room = 'DataKick';

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
              }, logError);
            }, logError);
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
                grabScreenshot();
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
                  }, logError);
                }, logError);
            }, logError);
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

        function logError(error, message) {
          console.log(message + ': ', error);
        }


class VideoFeed extends Component {
  constructor(props) {
    super(props);
  }

  _press(event) {
    join('DataKick');
  }


  componentDidMount() {
    container = this
    // auto join room
    // console.log("CHANGE BACK TO: this.props.moveId")
    // console.log('this is the moveId', this.props.moveId);
    // this.join(this.props.moveId);
    join(room);
  }


	render() {
	    return (
        <div className="panel panel-default">

          <div className="panel-body text-center">

            <button onClick={this._press}>Data</button>

          </div>

        </div>
	    );
	}
}

export default VideoFeed;

