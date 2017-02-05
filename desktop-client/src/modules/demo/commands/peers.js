export default {
  sendhi(e, peerid, webrtc) {
    console.log('peerid', peerid)
    console.log('webrtc', webrtc)
    console.log('sent')
    webrtc.send('hi!')
  },
}
