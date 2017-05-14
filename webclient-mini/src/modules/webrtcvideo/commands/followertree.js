export default {
  addfollowerofjane({peer, conn, transact}) {
    peer.send('hi')
    transact(conn, [{
      ':db/id': -1,
      name: `Follower of J9ne ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }])
  },
}
