export default {
  addfollowerofjane() {
    return {
      ':db/id': -1,
      name: `Follower of Jane ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }
  },
}
