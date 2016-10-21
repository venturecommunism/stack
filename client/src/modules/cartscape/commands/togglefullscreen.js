export default {
  togglefullscreen({conn, transact}, e, togglestate) {
    if (togglestate.length == 0) {
      transact(conn, [{
        ':db/id': -1,
        'app/fullscreen': true,
      }])
    } else {
      transact(conn, [[':db/retract', togglestate[0][0], 'app/fullscreen', true]])
    }
  },
}
