export default {
  inputcredentials({conn, transact, log, meta}, ref, result) {
    transact(conn, [{':db/add': -1, 'name': 'Credentials', 'app/credentials': ref }])
  },
}
