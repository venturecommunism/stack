//import { withDatascriptQuery } from '../../../lib/react-datascript'

//import jsonld from 'jsonld'
import {promises} from 'jsonld'

var imagine

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

var promise = promises.toRDF(doc, {format: 'application/nquads'})
promise.then(function(nquads) {
  imagine = nquads
  console.log(imagine)
  return imagine
}, function(err) {
  console.log(err)
})


/**
 * A higher order component that declares a query for returning names
 * of all users in the graph
 */
const json = doc

export default json
