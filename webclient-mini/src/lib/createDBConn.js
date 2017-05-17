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
    'app/secrets': {
      ':db/cardinality': ':db.cardinality/many'
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
      query: `[:find ?e ?user
 :where [?e "name"]
        [?e "name" ?user]]`
    },
    {
      ':db/id': -5,
      name: 'Stringified Result',
      query: `[:find ?user
 :where [?u "name"]
        [?u "name" ?user]]`
    },
    {
      ':db/id': -5,
      name: 'Secrets',
      'app/secrets': ['app/secrets', 'app/credentials']
    }
  ]

  /**
   * Transact in the data, to be stored and indexed by datascript for performant
   * querying.
   */
  datascript.transact(conn, datoms)
  return conn
}
