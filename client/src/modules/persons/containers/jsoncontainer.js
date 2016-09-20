import {composeWithPromise} from 'react-komposer'

import {promises} from 'jsonld'

var doc = {
  "@context": "http://json-ld.org/contexts/person.jsonld",
  "@id": "http://dbpedia.org/resource/John_Lennon",
  "name": "John Lennon",
  "born": "1940-10-09",
  "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
}

const getServerTime = () => {

  const promise = promises.toRDF(doc, {format: 'application/nquads'})

  return promise
  .then((nquads) => {
    return {data: nquads}
  })
}

const composerFunction = (props) => {
  return getServerTime()
}

export default (component) => composeWithPromise(composerFunction)(component)
