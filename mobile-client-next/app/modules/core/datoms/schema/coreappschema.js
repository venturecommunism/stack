/**
 * Define a schema for a graph of users (with the names declared to be
 * unique which allows better performance, along with being able to easily lookup
 * an entity by this unique identifier)
 *
 * The users are connected by the 'follows' attribute (which is defined as a
 * reference type, with a cardinality of 'many' since someone can follow more
 * than one person.)
 */


const Schema = {
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

export default Schema
