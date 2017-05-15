import React from 'react'
//import counter from '../observables/counter'
import {observer} from 'mobx-react'

function Comparator(a, b) {
   if (a[0] < b[0]) return 1
   if (a[0] > b[0]) return -1
   return 0
}

const PlainResult = ({ result, counter }) => (
  <div>
    <h3>Twitter Stream</h3>
    <div onClick={() => counter.value++}>click to increase counter value: {counter.value}</div>
    <div onClick={() => counter.value--}>click to decrease counter value: {counter.value}</div>
    <ul>
      {result.sort(Comparator).slice(0,5).map(([e, user, tweet]) => (
        <li key={e}>
          <div>{`@${user} said:`}</div>
          <div>{`${tweet}`}</div>
          <p></p>
        </li>
      ))}
    </ul>
  </div>
)

export default observer(PlainResult)
