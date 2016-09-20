//TODO: reimplement this with the local datascript cache so it doesn't refresh automatically

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

  const promise = promises.expand(doc)

  return promise
  .then((result) => {
    const data = JSON.stringify(result)
    return {data}
  })
}

const composerFunction = (props) => {
  return getServerTime()
}

export default (component) => composeWithPromise(composerFunction)(component)
