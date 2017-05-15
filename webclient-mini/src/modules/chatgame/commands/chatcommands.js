export default {
  addfollowerofjane({conn, transact}) {
    transact(conn, [{
      ':db/id': -1,
      name: `Follower of J3ne ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }])
  },
}
