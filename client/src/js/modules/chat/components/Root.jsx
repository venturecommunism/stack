import React, { Component } from 'react'
import moment from 'moment'
import Chat from '../Chat'

console.log("test1.5")

//import PoisonedMessenger from './PoisonedMessenger' 

// yes, i'm 41 years old.
const NAMES = ['Girl', 'Boy', 'Horse', 'Poo', 'Face', 'Giant', 'Super', 'Butt', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const user = getRandomUser()
const isMe = (someUser) => user === someUser
const avatar = { uri: 'https://facebook.github.io/react/img/logo_og.png' }

class Root extends Component {

  constructor (props) {
    super(props)
console.log("test constructor")
    // bind our functions to the right scope
    this.handleSend = this.handleSend.bind(this)
console.log("new test")
    this.receiveChatMessage = this.receiveChatMessage.bind(this)
console.log("new test after that")
console.log("user", user)
    // let's chat!
    this.chat = Chat(user, this.receiveChatMessage)
    console.log("sending yow")
    this.chat.send("yow")
    console.log("sent yow")
  }

  // fires when we receive a message
  receiveChatMessage (message) {
    const { user } = message
console.log(message)
    if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)
/*
    this.refs.giftedMessenger.appendMessage({
      text: message.body,
      name: message.user,
      image: avatar,
      position: 'left',
      date: moment()
    })
*/
console.log({
  text: message.body,
  name: message.user,
  image: avatar,
  position: 'left',
  date: moment()
})
  }

  // fires when we need to send a message
  handleSend (message) {
    this.chat.send(message.text)
  }

  // draw our ui
  render () {
    return (
<div>
  <p>yow</p>
{/*        <PoisonedMessenger
          ref='giftedMessenger'
          handleSend={ this.handleSend }
          senderImage={ avatar }
          />
*/}
</div>
    )
  }

}

export default Root
