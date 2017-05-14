export default {
  buy({conn, transact, log, meta}, e) {
    // console.log('event', e)

    transact(conn, [[':db/add', -1, 'shoppingcart/thing', 'xxyyy'],
                    [':db/add', -1, 'state/otherthing', 'stuffinit']])
    transact(conn, [{'shoppingcart/thing': 'xxyyy', 'state/otherthing': 'newstuffinit'}])
    transact(conn, [[':db/retract', 4, 'shoppingcart/thing', 'xxyyy'],
                    [':db/retract', 4, 'state/otherthing', 'stuffinit']])

    console.log(log)
    console.log(meta)
  },
}
