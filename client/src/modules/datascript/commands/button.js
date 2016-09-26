import {promises} from 'jsonld'
import parser from 'rdf-nx-parser'

export default {
  import({conn, transact}) {
    console.log(conn)

    var doc = {
      "@context": "http://json-ld.org/contexts/person.jsonld",
      "@id": "http://dbpedia.org/resource/John_Lennon",
      "name": "John Lennon",
      "born": "1940-10-09",
      "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
    }

    const promise = promises.toRDF(doc, {format: 'application/nquads'})

    return promise
    .then((ntriples) => {

      console.log(ntriples)

      ntriples.split(" .").map( triple => transacttriple(triple+" .") )

      function transacttriple(triple) {
        console.log("triple", triple)
        var parsedtriple = parser.parseTriple(triple)

        console.log(parsedtriple)

        transact(conn, [

          {
            ':db/id': -1,
            name: `${parsedtriple.object.value}`,
            follows: ['name', 'Jane']
          }

        ])
      }

    })
  },
}
