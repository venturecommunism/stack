const Schema = {
    'componentsname': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'componentsparents': {
      ':db/cardinality': ':db.cardinality/many',
      ':db/valueType': ':db.type/ref'
    },
    'componentstype': {
      ':db/cardinality': ':db.cardinality/one'
    },
    'componentid': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'componentquery': {
      ':db/cardinality': ':db.cardinality/one'
    },
}

export default Schema
