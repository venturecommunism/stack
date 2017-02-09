import Peer from 'peerjs'

export default {
  sendhi(e, peerid, webrtc) {
//    console.log('peerid', peerid)
let caller
    console.log('webrtc', webrtc)
const peer = new Peer({ key: 'lwjd5qra8257b9' })
//    console.log('sent')
//    webrtc.send('hi!')

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
                caller = peer.call(peerid, stream);
                caller.on('stream', (remoteStream) => {
                    // Show stream in some video/canvas element.
                    video.src = window.URL.createObjectURL(remoteStream)
                });
                caller.on("close", () => {
                    video.src = "";
                })
            }).catch((err) => {
                console.log('Failed to get local stream', err);
            })
        } else {
            navigator.getUserMedia({ video: true, audio: true }, (stream) => {
                caller = peer.call(peerid, stream);
                caller.on('stream', (remoteStream) => {
                    // Show stream in some video/canvas element.
                    video.src = window.URL.createObjectURL(remoteStream)
                });
                caller.on("close", () => {
                    video.src = "";
                })
            }, (err) => {
                console.log('Failed to get local stream', err);
            });
        }



  },
}
