import { Presence } from 'phoenix'
import fetch from 'isomorphic-fetch'

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function buildHeaders() {
  const authToken = localStorage.getItem('phoenixAuthToken');

  return { ...defaultHeaders, Authorization: authToken };
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

export function httpGet(url) {

  return fetch(url, {
    headers: buildHeaders(),
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function httpPost(url, data) {
  const body = JSON.stringify(data);

  return fetch(url, {
    method: 'post',
    headers: buildHeaders(),
    body: body,
  })
  .then(checkStatus)
  .then(parseJSON);
}

export default {
  connectToChannel({socket}) {
    console.log('attempting to connect: ping?')
    if (!socket) { return false }
    console.log('connect to channel: pong!')
    let roomId = '123456789'
    const channel = socket.channel(`rooms:${roomId}`);
    let presences = {};

    channel.on('presence_state', (state) => {
      presences = Presence.syncState(presences, state);
      alert('presence state')
    });

    channel.on('presence_diff', (diff) => {
      presences = Presence.syncDiff(presences, diff);
      alert('presence diff')
    });

    channel.on('message_created', (message) => {
      alert('presence message')
    });

    channel.join().receive('ok', (response) => {
      alert('presence join')
    });
  },
  addfollowerofjane({conn, transact}) {
    transact(conn, [{
      ':db/id': -1,
      name: `Follower of Jane ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }])
  },
  signIn({channel}) {
    channel.send('yow')
//    httpPost('https://xxx.xx.x.xxx/api/v1/sessions')
  }
}
