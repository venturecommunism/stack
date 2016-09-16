import datascript from 'datascript'

export default {
  addfollowerofjane(context) {

function transactstate ({conn}, data, txMsg) {
//const {conn} = context
console.log("context", context, "context")
console.log("conn", context.conn, "conn")
  datascript.transact(context.conn, data, txMsg);
console.log("newp")
}
console.log("ping")
    transactstate([{
      ':db/id': -1,
      name: `Follower of Jane ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }])
  },
}
