export default {
  addfollowerofjane({conn, transact}) {
    console.log('yow')
    console.log('test')
    transact(conn, [{
      ':db/id': -1,
      name: `Follower of J888ne ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }])
  },
}
