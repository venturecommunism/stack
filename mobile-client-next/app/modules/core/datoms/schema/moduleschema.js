const Schema = {
    'modulename': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'moduleid': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'rootcomponent': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/valueType': ':db.type/ref'
    },
    'moduleactionsets': {
      ':db/cardinality': ':db.cardinality/many',
      ':db/valueType': ':db.type/ref'
    },
    'moduleactions': {
      ':db/cardinality': ':db.cardinality/many',
      ':db/valueType': ':db.type/ref'
    },
    'sortfields': {
      ':db/cardinality': ':db.cardinality/one'
    },
    'sortorders': {
      ':db/cardinality': ':db.cardinality/one'
    },
}

export default Schema
