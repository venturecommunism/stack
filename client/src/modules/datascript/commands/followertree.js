import datascript from 'datascript'

export default {
  addfollowerofjane(context, conn) {

function transactstate (conn, data, txMsg) {
//const {conn} = context
console.log("conn", conn, "conn")
  datascript.transact(conn, data, txMsg);
}
console.log("ping")
    transactstate([{
      ':db/id': -1,
      name: `Follower of Jane ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }])
  },
}
