import { promises } from 'jsonld'

export default {
  importdata({conn, transact}, preparseddata) {
    // eslint-disable-next-line
    const data = eval("(" + preparseddata + ")")
    const context = "http://json-ld.org/contexts/person.jsonld"

    const promiseexpand = promises.expand(data)
    return promiseexpand
    .then((expanded) => {
      const promisecompact = promises.compact(expanded, context)
      return promisecompact
      .then((compacted) => {
        compacted["@graph"].forEach( c => c["@context"] = context )
        transact(conn, compacted["@graph"])
      },(err) => {
        console.log("compaction error:", err)
      })
    },(err) => {
      console.log("expansion error:", err)
    })

  },
}

/*
    var data = [{
      "@context": "http://json-ld.org/contexts/person.jsonld",
      "@id": "http://dbpedia.org/resource/John_Lennon",
      "name": "John Lennon",
      "born": "1940-10-09",
      "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
    },
    {
      "@context": "http://json-ld.org/contexts/person.jsonld",
      "@id": "http://dbpedia.org/resource/Will_Rogers",
      "name": "Will Rogers",
      "born": "1879-11-04",
      "spouse": "Betty Blake"
    }]
*/

