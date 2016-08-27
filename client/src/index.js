import {Socket, LongPoller} from 'phoenix'
import $ from 'jquery'

const socket = new Socket("ws://xx.xxx.xxx.xxx:4000/socket")
//socket.connect({user_id: "123"})

/***/
socket.connect()

let channel = socket.channel("rooms:lobby", {})

channel.join().receive("ok", chan => {
  console.log("Welcome to Phoenix Chat!")

/*
  chatInput.off("keypress").on("keypress", event => {
    if(event.keyCode === 13){
      chan.push("new_msg", {body: chatInput.val()})
      chatInput.val("")
    }
  })
*/
  chan.on("new_msg", payload => {
console.log(payload.body)
  })
})

/***/


channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })
  .after(10000, () => console.log("Connection interruption"))

channel.onError(e => console.log("something went wrong", e))
channel.onClose(e => console.log("channel closed", e))


    channel.on("new:msg", msg => {
console.log(msg)
    })

  channel.on("new_msg", doc => {
console.log("yowsa")
    // upsert because messages we sent will result in duplicates if we insert

})

console.log("test2")


//    let socket = new Socket("ws://xx.xxx.xxx.xxx/socket", {
//      logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) })
//    })

    var $status    = $("#status")
    var $messages  = $("#messages")
    var $input     = $("#message-input")
    var $username  = $("#username")

    socket.onOpen( ev => console.log("OPEN", ev) )
    socket.onError( ev => console.log("ERROR", ev) )
    socket.onClose( e => console.log("CLOSE", e))

    var chan = socket.channel("rooms:lobby", {})
    chan.join().receive("ignore", () => console.log("auth error"))
               .receive("ok", () => console.log("join ok"))
               .after(10000, () => console.log("Connection interruption"))
    chan.onError(e => console.log("something went wrong", e))
    chan.onClose(e => console.log("channel closed", e))

    $input.off("keypress").on("keypress", e => {
      if (e.keyCode == 13) {
        chan.push("new:msg", {user: $username.val(), body: $input.val()})
        $input.val("")
      }
    })

    chan.on("new:msg", msg => {
      $messages.append(this.messageTemplate(msg))
      scrollTo(0, document.body.scrollHeight)
    })

    chan.on("user:entered", msg => {
      var username = this.sanitize(msg.user || "anonymous")
      $messages.append(`<br/><i>[${username} entered]</i>`)
    })
 



/*
// modules
import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

// api
import FirebaseApi from './api/firebase';

// actions
import {authInitialized} from './actions/authActions';
import {ajaxCallError, beginAjaxCall} from './actions/ajaxStatusActions';

// components
import App from './components/App';

// Store
import initialState from './reducers/initialState';
import configureStore from './store/configureStore'; //eslint-disable-line import/default

// styles
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

// store initialization
const store = configureStore(initialState);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
const rootEl = document.getElementById('root');

// Initialize Firebase Auth and then start the app
store.dispatch(beginAjaxCall());
FirebaseApi.initAuth()
  .then(
    user => {
      store.dispatch(authInitialized(user));

      ReactDOM.render(
        <AppContainer>
          <Provider store={store}>
            <App history={history} store={store}/>
          </Provider>
        </AppContainer>,
        rootEl
      );

      if (module.hot) {
        module.hot.accept('./components/App', () => {
          // If you use Webpack 2 in ES modules mode, you can
          // use <App /> here rather than require() a <NextApp />.
          const NextApp = require('./components/App').default;
          ReactDOM.render(
            <AppContainer>
              <Provider store={store}>
                <NextApp history={history} store={store}/>
              </Provider>
            </AppContainer>,
            rootEl
          );
        });
      }
    })
  .catch(
    error => {
      store.dispatch(ajaxCallError());
      console.error('error while initializing Firebase Auth'); // eslint-disable-line no-console
      console.error(error); // eslint-disable-line no-console
    });
*/
