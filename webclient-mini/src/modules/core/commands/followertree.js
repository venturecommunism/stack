export default {
  addfollowerofjane({conn, transact}) {
alert('yow')
    transact(conn, [{
      ':db/id': -1,
      name: `Follower of J1ne ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }])
  },
}
