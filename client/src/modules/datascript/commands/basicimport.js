import { promises } from 'jsonld'
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

    transact(conn, [

      {            
        ':db/id': -1,
        "@id": `${doc["@id"]}`,
        "name": `${doc["name"]}`,
        "born": `${doc["born"]}`,
        "spouse": `${doc["spouse"]}`,
        "follows": ['name', 'Jane']
      }

    ])

  },
}
