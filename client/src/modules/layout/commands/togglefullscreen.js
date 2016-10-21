export default {
  togglefullscreen({conn, transact}) {
    transact(conn, [{
      ':db/id': -1,
      'app/togglefullscreen': true,
      name: `Follower of Jane ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }])
  },
}
