export default {
  addfollowerofjane({conn, transact}) {
    transact(conn, [{
      ':db/id': -1,
      name: `Follower of J2ne ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }])
  },
}
