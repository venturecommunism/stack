import { composeWithPromise } from 'mantra-core'

import {promises} from 'jsonld'

var doc = {
  "@context": "http://json-ld.org/contexts/person.jsonld",
  "@id": "http://dbpedia.org/resource/John_Lennon",
  "name": "John Lennon",
  "born": "1940-10-09",
  "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
}

/*
jsonld.toRDF(doc, {format: 'application/nquads'}, function(err, nquads) {
  imagine = nquads
  console.log(imagine)
})
*/

const promise = promises.toRDF(doc, {format: 'application/nquads'})

promise
.then((nquads) => {
  console.log(nquads)
})
/*
promise.then(function(nquads) {
  imagine = nquads
  console.log(imagine)
  return imagine
}, function(err) {
  console.log(err)
})
*/

const onPropsChange = (props) => {
    promise
    .then((nquads) => {
//not showing up
console.log("test")
      return {
        nquads,
      }
    })
}

export default (component) => composeWithPromise(
  onPropsChange
)(component)

