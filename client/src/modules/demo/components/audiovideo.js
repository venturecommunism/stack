import React, { Component } from 'react';
import Peer from 'peerjs';
import datascript from 'datascript'

export class App extends Component {
  constructor(props) {
    super(props);

console.log('PROPS', props)

console.log(Object.keys(props))
console.log(props.result)
console.log('conn', props.conn)

  var query = `[:find ?id
                :where [?e ":app/peer" ?id]]`

  var db = datascript.db(props.conn)

  const qArgs = [query, db]
  var result = datascript.q(...qArgs)

var peer = new Peer({
  // Set API key for cloud server (you don't need this if you're running your
  // own.
  key: 'x7fwx2kavpy6tj4i',
  // Set highest debug level (log everything!).
  debug: 0,
  // Set a logging function:
  logFunction: function() {
    var copy = Array.prototype.slice.call(arguments).join(' ')
    console.log(copy)
  }
})


  var webrtc = peer.connect(result[0])


    var id = parseInt(Math.random()*1e4,10).toString(16);
    this.state =  {
      hash: id,
//      peer: new Peer(id, {key: '45ebf7pheel8fr'})
      peer: props.Peer,
      peerid: result[0],
    };
  }

  componentDidMount() {
    navigator.getUserMedia = (
      navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia
    );

    this.state.peer.on('open', (id) => console.log('Peer ID: ' + id));
    this.state.peer.on('call', this.onReceiveCall.bind(this));
    this.prepareSelfVideo();

    var peerid = this.state.peerid

    var url = window.location.href;
    var match = url.match(/#(.+)/);
//    if (match != null) {
      this.setState({caller:true});
console.log("matching stuff")
      this.call(peerid);
//    }
  }

  getMedia(options, success, error) {
console.log('getmedia')
    navigator.getUserMedia(options, success, error);
  }

  onReceiveCall(call) {
console.log('about to answer..')
    this.getMedia({audio: true, video: false}, (stream) => {
      console.log("answering..");
      call.answer(stream)
    }, (err) => console.log(err));

    call.on('stream', (stream) => {
      var video = document.querySelector('video');
      video.src = window.URL.createObjectURL(stream);
    });
  }

  onReceiveStream(stream) {
console.log('yow')
    var video = document.querySelector('.video-call');
    video.src = window.URL.createObjectURL(stream);
console.log(video.src)
  }

  prepareSelfVideo() {
console.log('preparing self video')
    this.getMedia({audio: true, video: false}, (stream) => {
        var video = document.querySelector('.video-self');
        video.src = window.URL.createObjectURL(stream);
      }, (err) => console.log(err));
  }

  call(id) {
    this.getMedia({audio: true, video: false}, (stream) => {
        var call = this.state.peer.call(id, stream);
        console.log("calling..");
        call.on('stream', this.onReceiveStream);
      }, (err) => console.log(err));
  }

  componentWillUnmount() {
console.log('will unmount')
    this.state.peer.disconnect();
  }

  render() {
    return (
      <div className="container">
        <nav>
          Video Chat
        </nav>
        <div className="video-container">
          <video className="video-call" autoPlay></video>
          <video className="video-self" autoPlay></video>
          <div className="share">
            <a>Share - {"http://mertkahyaoglu.github.io/video-chat/#"+this.state.hash}</a>
          </div>
        </div>
        <footer>
          Made by <a target="_blank" href="http://mertkahyaoglu.github.io">Mert Kahyaoğlu</a>
        </footer>
      </div>
    );
  }
}

export default App
