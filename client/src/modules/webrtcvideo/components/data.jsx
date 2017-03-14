import React, { Component } from 'react';
import io from 'socket.io-client';

/************************************* SOCKET IO******************************************/ 

let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection;
let RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;

var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
let socket, container;
var pcPeers = {};

/************************************* SOCKET IO ******************************************/ 
const room = 'DataKick';

class VideoFeed extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    container = this;
    // establish socket connection
    socket = io('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});
    // socket = io('https://iiiiii.herokuapp.com', {transports: ['websocket']}); }
  }
  
  componentDidMount() {
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

    window.addEventListener('resize', this._handleWindowResize);

    // auto join room
    // console.log("CHANGE BACK TO: this.props.moveId")
    // console.log('this is the moveId', this.props.moveId);
    // this.join(this.props.moveId);
    this.join(room);
  }

	logError(error, message) {
	  console.log(message + ': ', error);
	}

	// 
	join(roomID) {
	  socket.emit('join', roomID, (socketIds) =>{
	    console.log('join', socketIds);
	    for (var i in socketIds) {
	      var socketId = socketIds[i];
	      this.createPC(socketId, true);
	    }
	  });
	}

	createPC(socketId, isOffer) {
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
	exchange(data) {
	  var fromId = data.from;
	  var pc;
	  if (fromId in pcPeers) {
	    pc = pcPeers[fromId];
	  } else {
	    pc = this.createPC(fromId, false);
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

	leave(socketId) {
	  console.log('leave', socketId);
	  var pc = pcPeers[socketId];
	  pc.close();
	  delete pcPeers[socketId];
	}

	render() {
	    return (
        <div className="panel panel-default">

          <div className="panel-body text-center">

            <div>Data</div>

          </div>

        </div>
	    );
	}
}

export default VideoFeed;

