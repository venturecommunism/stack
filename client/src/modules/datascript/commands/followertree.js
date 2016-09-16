export default {
  addfollowerofjane({transactstate}) {
    transactstate([{
      ':db/id': -1,
      name: `Follower of Jane ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }])
  },
}
