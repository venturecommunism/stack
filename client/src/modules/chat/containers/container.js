import d from 'datascript'

var db = d.empty_db()

var db1 = d.db_with(db, [[":db/add", 1, "name", "Ivan"],
                         [":db/add", 1, "age", 17]])

var db2 = d.db_with(db1, [{":db/id": 2,
                          "name": "Igor",
                          "age": 35}])

var db3 = d.db_with(db2, [{":db/id": 3,
                          "description": "some task",
                          "status": "pending"},
                          {":db/id": 4,
                          "description": "some new task",
                          "status": "somedaymaybe"}])

var q = '[:find ?n ?a :where [?e "name" ?n] [?e "age" ?a]]'

var q2 = '[:find ?d ?s :where [?e "description" ?d] [?e "status" ?s]]'

console.log(d.q(q, db1))
console.log(d.q(q, db2))
console.log(d.q(q2, db3))
