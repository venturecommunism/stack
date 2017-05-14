import {observable} from 'mobx'

const timer = observable({
  value: JSON.stringify(new Date())
})

setInterval(function() {
  timer.value = JSON.stringify(new Date())
}, 1000)

export default timer
