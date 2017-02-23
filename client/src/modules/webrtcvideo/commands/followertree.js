export default {
  addfollowerofjane({conn, transact}) {
    transact(conn, [{
      ':db/id': -1,
      name: `Follower of Jane ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }])
  },
}
