import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'
import Channel from '../../../configs/channel'

const dataComposer = ({ context, actions }, onData) => {
  // console.log('CONTEXT', Object.keys(context()))
  // console.log('ACTIONS', actions())

  const {peer, channel, conn, me} = context()

  var query = `[:find ?id
                :where [?e ":app/peer" ?id]]`

  var db = datascript.db(conn)

  const qArgs = [query, db]
  var result = datascript.q(...qArgs)

  console.log('RESULT 0', result[0])

  const receivertcmessage = (conn, message) => {
            console.log("Websocket message received: " + message);

//            var json = JSON.parse(message);
var json = message.body
console.log('json', json)

//alert(Object.keys(json))

            if(json.action == "candidate"){
                if(json.to == user){
console.log('about to process ice')
                  processIce(json.data);
                }
            } else if(json.action == "offer"){
                // incoming offer
                if(json.to == user){
console.log('about to process offer')
                    user2 = json.from;
                    processOffer(json.data)
                }
            } else if(json.action == "answer"){
                // incoming answer
                if(json.to == user){
console.log('about to process answer')
                    processAnswer(json.data);
                }
            }
  }

const rtc_channel = Channel(conn, me, receivertcmessage)

    var ws = null;
    var user = "";
    var user2 = "";

// when a message comes in, candidate => processice(data), offer => user2 = json.from; processOffer(data), answer => processAnswer(data)

    user = me

    var config = {"iceServers":[{"url":"stun:stun.l.google.com:19302"}]};
    var connection = {};

    var peerConnection;
    var dataChannel;

    user2 = result[0]
    openDataChannel();

    var sdpConstraints = { offerToReceiveAudio: true,  offerToReceiveVideo: false }
    peerConnection.createOffer(sdpConstraints).then(function (sdp) {
      peerConnection.setLocalDescription(sdp);
      sendNegotiation("offer", sdp);
      console.log("------ SEND OFFER ------");
    }, function (err) {
      console.log(err)
    });


    function sendDirect(e){
        e.preventDefault();
        dataChannel.send($("#message").val());
        $('body').append('Me: <div class="message">'+$("#message").val()+'</div>');
        console.log("Sending over datachannel: " + $("#message").val());
        $("#message").val('');
    }

    function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
    }

    function openDataChannel (){
        peerConnection = new webkitRTCPeerConnection(config, connection);
        peerConnection.onicecandidate = function(e){
            if (!peerConnection || !e || !e.candidate) return;
            var candidate = event.candidate;
            sendNegotiation("candidate", candidate);
        }

        dataChannel = peerConnection.createDataChannel("datachannel", {reliable: false});

        dataChannel.onopen = function(){
            console.log("------ DATACHANNEL OPENED ------")
                    dataChannel.send('hi')
        };
        dataChannel.onclose = function(){console.log("------ DC closed! ------")};
        dataChannel.onerror = function(){console.log("DC ERROR!!!")};

        peerConnection.ondatachannel = function (ev) {
            console.log('peerConnection.ondatachannel event fired.');
            ev.channel.onopen = function() {
                console.log('Data channel is open and ready to be used.');
            };
            ev.channel.onmessage = function(e){
                console.log("DC from ["+user2+"]:" +e.data);
                $('body').append(user2+': <div class="message from">'+e.data+'</div>')
            }
        };

        return peerConnection
    }

    function sendNegotiation(type, sdp){
        var json = { from: user, to: user2, action: type, data: sdp};
console.log('rtc_channel.send')
        rtc_channel.send(json);
        console.log("Sending ["+user+"] to ["+user2+"]: " + JSON.stringify(sdp));
    }

    function processOffer(offer){
        var peerConnection = openDataChannel();
        peerConnection.setRemoteDescription(new RTCSessionDescription(offer)).catch(e => {
            console.log(e)
        });

        var sdpConstraints = {'mandatory':
            {
                'OfferToReceiveAudio': false,
                'OfferToReceiveVideo': false
            }
        };

        peerConnection.createAnswer(sdpConstraints).then(function (sdp) {
            return peerConnection.setLocalDescription(sdp).then(function() {
                sendNegotiation("answer", sdp);
                console.log("------ SEND ANSWER ------");
            })
        }, function(err) {
            console.log(err)
        });
        console.log("------ PROCESSED OFFER ------");

    };

    function processAnswer(answer){

        peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        console.log("------ PROCESSED ANSWER ------");
        return true;
    };

    function processIce(iceCandidate){
console.log('process ice')
        peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate)).catch(e => {
            debugger
            console.log(e)
        })
    }

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
