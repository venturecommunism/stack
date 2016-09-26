import {promises} from 'jsonld'
import datascript from 'datascript'

export default {
  import({conn}) {
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
    .then((nquads) => {

      console.log(nquads)

      const transact = (conn, data, txMsg) => {
        console.log("conn", conn)
        console.log("data", data)
        console.log("txMsg", txMsg)
        datascript.transact(conn, data, txMsg);
      }

      transact(conn, [

        {
          ':db/id': -1,
          name: `Tx ${new Date().getTime()}`,
          follows: ['name', 'Jane']
        }

      ])


      return {
        data: nquads
      }
    })
  },
}

