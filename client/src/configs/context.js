import datascript from 'datascript'
import createDBConn from '../lib/createDBConn'
import { Socket } from 'phoenix'
import Channel from './channel'
import url from './url'
import publickey from './publickey'
import creds from './creds'

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
//      console.log('connect');
    });

    socket.on('exchange', function(data){
//      console.log('exchange')
      exchange(data);
    });

    socket.on('leave', function(socketId){
      leave(socketId);
    });


    join(room);


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
//            console.log('onicecandidate', event);
            if (event.candidate) {
              socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
            }
          };

          function createOffer() {
            pc.createOffer(function(desc) {
//              console.log('createOffer', desc);
              pc.setLocalDescription(desc, function () {
//                console.log('setLocalDescription', pc.localDescription);
                socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
              }, logError);
            }, logError);
          }

          pc.onnegotiationneeded = function () {
//            console.log('onnegotiationneeded');
            if (isOffer) {
              createOffer();
            }
          }

          pc.oniceconnectionstatechange = function(event) {
//            console.log('oniceconnectionstatechange', event);
            if (event.target.iceConnectionState === 'connected') {
              createDataChannel();
            }
          };
          pc.onsignalingstatechange = function(event) {
//            console.log('onsignalingstatechange', event);
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
    channel.send({id: pc.id})
    dataChannel.send('test-context')
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
//            console.log('exchange sdp', data);
            pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
              if (pc.remoteDescription.type == "offer")
                pc.createAnswer(function(desc) {
                  console.log('createAnswer', desc);
                  pc.setLocalDescription(desc, function () {
//                    console.log('setLocalDescription', pc.localDescription);
                    socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
                  }, logError);
                }, logError);
            }, logError);
          } else {
//            console.log('exchange candidate', data);
            pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          }
        }

        function leave(socketId) {
          console.log('leave', socketId);
          var pc = pcPeers[socketId];
          pc.close();
          delete pcPeers[socketId];
        }


import {KJUR, KEYUTIL, b64utoutf8} from 'jsrsasign'

import Peer from 'peerjs'

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

const NAMES = ['Girl', 'Boy', 'Horse', 'Foo', 'Face', 'Giant', 'Super', 'Bug', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const me = getRandomUser()

const ex_socket = new Socket(url)
const conn = createDBConn()
const transact = datascript.transact
var log = []
var meta = []
var peers = []

// fires when we receive a message
const receiveChatMessage = (conn, message) => {
  const user = message.user
  const isMe = (someUser) => me === someUser
  console.log('ELIXIR MSG', JSON.stringify(message))

  if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)

    if (message.user == 'system') {
      function org_transaction(s) {
        return [':db/add', s.e, s.a, s.v]
      }

      function sort_func(a, b) {
        return b.tx - a.tx
      }

      var sorted_body = message.body.sort(sort_func)

      var tx_id = message.body[0].tx
      var bool_val = true
      message.body.map( s => s.tx != tx_id ? bool_val = false : '')
      if (bool_val == true) {
        var single_tx = [[':db/add', 0, 'app/sync', tx_id]]
        message.body.map(s => single_tx.push(org_transaction(s)) )
        transact(conn, single_tx, {'remoteuser': message.user})
        return
      }

      function recurse_array(whole, part) {
        if (whole.length < 1 || part.length > 0 && whole[whole.length - 1].tx != part[part.length - 1].tx) {
          var tx_id = part[0].tx
          var array_of_arrays = [[':db/add', 0, 'app/sync', tx_id]]
          part.map(s => array_of_arrays.push(org_transaction(s)) )
          transact(conn, array_of_arrays, {'remoteuser': message.user})
          if (whole.length < 1) return
          recurse_array(whole, [])
        } else {
          part.push(whole[whole.length - 1])
          whole.splice(whole.length - 1, 1)
          recurse_array(whole, part)
        }
      }

      recurse_array(sorted_body, [])

    } else

    if (message.body.id) {
      peers.push(message.body.id)
      transact(conn, [[':db/add', -1, ':app/peer', message.body.id]], {'remoteuser': 'system tweets'})
    } else

    if (message.tweet) {
      transact(conn, [{
        ':db/id': -1,
        ...message
      }], {'remoteuser': 'system tweets'})
    } else {

    const tx = {}
    message.body.map(s => tx[s.a] = s.v)

    transact(conn, [{
      ':db/id': -1,
      ...tx
    }], {'remoteuser': message.user})
  }
}

const channel = Channel(conn, me, receiveChatMessage)

// fires when we transact data
datascript.listen(conn, {channel}, function(report) {
  log.push(report.tx_data)
  meta.push(report.tx_meta)

  if (report.tx_meta && report.tx_meta.remoteuser || report.tx_meta && report.tx_meta.secrets) return

  var query = `[:find ?id
                :where [?e ":app/peer" ?id]]`

  var db = datascript.db(conn)

  const qArgs = [query, db]
  var result = datascript.q(...qArgs)
  console.log('RESULT', result)

join(room)

var pc_keys = Object.keys(pcPeers)
pc_keys.map( s => {
  console.log('PC KEYS', s)
  var pc = pcPeers[s]
  var dataChannel = pc.createDataChannel("text");
  dataChannel.onopen = function () {
    console.log('ds.listen dataChannel.onopen');
    channel.send({id: pc.id})
    dataChannel.send('ds-listener-test-context')
  };

})

  result.map( s => {

var dataChannel = createPC(pcPeers[s], true)
console.log('DATA CHANNEL', dataChannel)
dataChannel.send('wat')


    var webrtc = peer.connect(s)
    webrtc.on('open', function(){
      webrtc.send(JSON.stringify({creds: creds, body: report.tx_data}))
    })
  })

  // channel.send(report.tx_data)
})

peer.on('connection', connect)

function connect(c) {
  c.on('data', function(data) {
    const tx = {}

    console.log(c)
    console.log('WEBRTC MSG', data)

    const pubkey = KEYUTIL.getKey(publickey)

    const isValid = KJUR.jws.JWS.verifyJWT(JSON.parse(data).creds, pubkey, {alg: ['RS256']})

    if (!isValid) {
      console.log('unauthorized peer data')
      return
    }

    data = JSON.parse(data).body

    data.map(s => tx[s.a] = s.v)
    console.log('c', c)

    const credquery = `[:find ?id
                        :where [?e ":app/peer" ?id]]`

    var db = datascript.db(conn)

    const credArgs = [credquery, db]
    var result = datascript.q(...credArgs)
    console.log('C.DATA RESULT', result)

    console.log(c.peer)
    transact(conn, [[':db/add', -1, ':app/peer', c.peer]], {'remoteuser': 'system peers'})
    transact(conn, [{
      ':db/id': -1,
      ...tx
    }], {'remoteuser': c.peer})
  })
}

export const initContext = () => {
  return {
    pcPeers: pcPeers,
    me: me,
    peer: peer,
    peers: peers,
    socket: ex_socket,
    conn: conn,
    channel: channel,
    transact: transact,
    log: log,
    meta: meta,
  }
}
