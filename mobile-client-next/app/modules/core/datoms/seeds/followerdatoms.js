  /**
   * Define some seed data; including some `follower` references (that make
   * use of a temporary id to point to other entities within the array.)
   */
  const followerdatoms = [
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
      name: 'Stringified Result',
      query: `[:find ?user
 :where [?u "name"]
        [?u "name" ?user]]`
    },
  ]

export default followerdatoms
