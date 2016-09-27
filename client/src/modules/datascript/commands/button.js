import { promises } from 'jsonld'

export default {
  import({conn, transact}) {

    var doc = {
      "@context": "http://json-ld.org/contexts/person.jsonld",
      "@id": "http://dbpedia.org/resource/John_Lennon",
      "name": "John Lennon",
      "born": "1940-10-09",
      "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
    }

    const promiseexpand = promises.expand(doc)

    return promiseexpand
    .then((expanded) => {
      const promisecompact = promises.compact(expanded, "http://json-ld.org/contexts/person.jsonld")

      return promisecompact
      .then((compacted) => {
        transact(conn, [

          {
            ':db/id': -1,
            ...compacted
          }

        ])

      })
    })
  },
}
