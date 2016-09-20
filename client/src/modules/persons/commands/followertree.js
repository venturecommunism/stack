export default {
  import(e, f) {
    e ? console.log(e) : console.log('e')
    f ? console.log(f) : console.log('f')
    return {
      ':db/id': -1,
      name: `Follower of Jane ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }
  },
}
