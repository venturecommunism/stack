import {observable} from 'mobx'

const counter = observable({
  value: 0
})

setInterval(function() {
  counter.value += 1
}, 1000)

export default counter
