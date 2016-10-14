import datascript from 'datascript'

export default {
  buy({conn, transact}, e) {
    // console.log('conn', conn)
    // console.log('transact', transact)
    // console.log('event', e)

    // the following creates and deletes some nodes if and only if the first entity id it created is 4. subsequent clicks create entities 5, 6, 7, etc.

    var log = []
    var meta = []
    datascript.listen(conn, function(report) {
                              log.push(report.tx_data)
                              meta.push(report.tx_meta)
    })

    console.log(transact(conn, [[':db/add', -1, 'shoppingcart/thing', 'xxyyy'],
                    [':db/add', -1, 'state/otherthing', 'stuffinit']]))
    console.log(transact(conn, [[':db/retract', 4, 'shoppingcart/thing', 'xxyyy'],
                    [':db/retract', 4, 'state/otherthing', 'stuffinit']]))

    console.log(log)
    console.log(meta)
    return {
      ':db/id': -1,
      name: `Follower of Jane ${new Date().getTime()}`,
      follows: ['name', 'Jane']
    }
  },
}
