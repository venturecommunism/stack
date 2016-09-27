import { promises } from 'jsonld'
import parser from 'rdf-nx-parser'

export default {
  import({conn, transact}) {

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
      var name = ''
      var born = ''
      var spouse = ''

      ntriples.split(" .").map( triple => transacttriple(triple+" .") )

      function transacttriple(triple) {
        if (!parser.parseTriple(triple)) {
          return
        }
        var parsedtriple = parser.parseTriple(triple)

        const jsonld = {
          name: "http://xmlns.com/foaf/0.1/name",
          born: "http://schema.org/birthDate",
          spouse: "http://schema.org/spouse"
        }

        if (parsedtriple.predicate.value === jsonld.name) {
          name = parsedtriple.object.value
        }
        if (parsedtriple.predicate.value === jsonld.born) {
          born = parsedtriple.object.value
        }
        if (parsedtriple.predicate.value === jsonld.spouse) {
          spouse = parsedtriple.object.value
        }
      }

      transact(conn, [

        {
          ':db/id': -1,
          "@id": "http://dbpedia.org/resource/John_Lennon",
          "name": `${name}`,
          "born": `${born}`,
          "spouse": `${spouse}`,
//          "follows": ['name', 'Jane']
        }

      ])

    })
  },
}
