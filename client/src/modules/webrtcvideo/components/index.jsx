import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import io from 'socket.io-client';
// import styles from './styles';
import Videotag from 'react-html5video';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

/************************************* SOCKET IO******************************************/ 

// let socket = io('https://localhost:4443/');
let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection;
let RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;

var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
let socket, localStream, remoteStream, container;
var pcPeers = {};

/************************************* SOCKET IO ******************************************/ 
const scale = .329;
const aspect = 1.3;
const room = 'MoveKick';

class VideoFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localStreamURL: null,
      remoteStreamURL: null,
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this._handleWindowResize = this._handleWindowResize.bind(this);
  }

  componentWillMount() {
    container = this;
    // establish socket connection
    socket = io('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});
    // socket = io('https://iiiiii.herokuapp.com', {transports: ['websocket']}); }
  }

  endCall(goBack) {
    let videoTrack = localStream.getVideoTracks()[0];
    let audioTrack = localStream.getAudioTracks()[0];
    videoTrack.stop();
    audioTrack.stop();
    console.log('stopping video track');
    console.log('stopping audio track');

    if (goBack) {
    	browserHistory.goBack();
    }
    console.log('calling back')
  }
  
  componentDidMount() {
    socket = io('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});

    socket.on('connect', (data) => {
      console.log('connect');
      this.getLocalStream();
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

  componentWillUnmount() {
      window.removeEventListener('resize', this._handleWindowResize);
      this.endCall(false);
  }

	_handleWindowResize() {
		this.setState({ width: window.innerWidth, height: window.innerHeight })
	}

	logError(error, message) {
	  console.log(message + ': ', error);
	}

	// get local video stam from user and createObjectURL then attach that as the video source
	getLocalStream() {
	  navigator.getUserMedia({ "audio": true, "video": true }, (stream) => {
	    localStream = stream;
	    this.setState({ localStreamURL: URL.createObjectURL(stream) });
	  }, this.logError);
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

	  pc.onaddstream = function (event) {
	    console.log('onaddstream', event);
	    let remoteStreamURL = URL.createObjectURL(event.stream);
	    container.setState({ remoteStreamURL });
	  };

	  pc.addStream(localStream);
	  
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


	grabScreenshot() {
		let remoteStream = container.refs.remoteVideo;
		let video = remoteStream.player.player;
		let canvas = container.refs.canvas;
		canvas.width = this.state.width * scale;
  	canvas.height = this.state.width * aspect * scale;
  	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  	// create screenshot data object
		let screenshot = canvas.toDataURL("image/png");
		let id = Date.now();
		localStorage.setItem(id, screenshot);
		
		// set that as state in Survey Component
		container.props.handleScreenshot(id);
	}

	render() {
			console.log(this.state.width)
			const { width } = this.state;
	    return (
        <div className="panel panel-default">

          <div className="panel-body text-center">

  	        <ReactPlayer playing volume={0}
  	        	url={this.state.localStreamURL}
  	        	width={ width * .10} 
  	        	height={ (3/4) * width * .10 }
  	        	style={{position: 'absolute', width: '30%', marginRight: '70%'}}/>
  	 
  	        <ReactPlayer playing volume={5}
  	        	ref='remoteVideo' 
  	        	url={this.state.remoteStreamURL} 
  	        	width={(width - 180) * .392 } 
  	        	height={ 1.33 * (width - 180) * .392 } />

            <Button  
              bsStyle='danger' 
              bsSize='lg' 
              onClick={() => this.endCall(true)}>End Survey</Button>

          </div>

          <canvas ref='canvas' style={{display: 'none'}}></canvas>

        </div>
	    );
	}
}

export default VideoFeed;

