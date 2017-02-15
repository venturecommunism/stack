import datascript from 'datascript'
window.d = datascript

export default () => {
/**
 * Define a schema for a graph of users (with the names declared to be
 * unique which allows better performance, along with being able to easily lookup
 * an entity by this unique identifier)
 *
 * The users are connected by the 'follows' attribute (which is defined as a
 * reference type, with a cardinality of 'many' since someone can follow more
 * than one person.)
 */
  const twitterUserSchema = {
    name: {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    follows: {
      ':db/cardinality': ':db.cardinality/many',
      ':db/valueType': ':db.type/ref'
    },
    'shoppingcart/thing': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'app/fullscreen': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'app/credentials': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'app/sync': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
  }

  /**
   * Create connection to db (that's been instantiated with the schema above.)
   */
  const conn = datascript.create_conn(twitterUserSchema)

  /**
   * Define some seed data; including some `follower` references (that make
   * use of a temporary id to point to other entities within the array.)
   */
  const datoms = [
    {
      ':db/id': -1,
      name: 'John',
      follows: -3
    },
    {
      ':db/id': -2,
      name: 'David',
      follows: [-3, -1]
    },
    {
      ':db/id': -3,
      name: 'Jane'
    },
    {
      ':db/id': -4,
      name: 'Twitter Stream',
      query: `[:find ?e ?user ?tweet
 :where [?e "tweet"]
        [?e "tweet" ?tweet]
        [?e "user" ?user]]`
    },
    {
      ':db/id': -5,
      name: 'Stringified Result',
      query: `[:find ?user
 :where [?u "name"]
        [?u "name" ?user]]`
    },
    {
      ':db/id': -6,
      name: 'Credentials',
      'app/credentials': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODcxMTE2NjQsImlhdCI6MTQ4NzExMTY2NCwiZXhwIjoxNDg3MTk4MDY0LCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.pqcMDbUSeSX04fSwaOXqb7it6cBy6QaJhB_Ee7IrlJZtMYlVML7zmfB3FU7O494Qkh8n1luXKFSlEeytCNx5HHBSCCtOsBIG6aaqSmW-u2awwQgpzMFFD5MUTNqnOFnjw3DjPubNIQqMbC9Y5c7xvWlz6GFwP7YEOwjCVTitf1wEhN3b2iNBUF5DtUukFMnEMv2pEPi9PAzY0LzJHzJRg9Ntc7jqKi060ELppOcjOV1GSs-ofF1Z--xNXZbi5vULaYEyh6inN0wFDdoEz1lq6xSJUSFRMgCbULXRCqhtaK1A2Fhqg3aTRPInavXnJutozlgUYI7sbyXtVKbNSEWUyA'
    },
  ]

  /**
   * Transact in the data, to be stored and indexed by datascript for performant
   * querying.
   */
  datascript.transact(conn, datoms)
  return conn
}
