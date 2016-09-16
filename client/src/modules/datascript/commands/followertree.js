export default {
  addfollowerofjane({transact}) {
    transact([{
      ':db/id': -1,
      name: `Follower of Jane ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }])
  },
}
