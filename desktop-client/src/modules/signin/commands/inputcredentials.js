export default {
  inputcredentials({conn, transact, log, meta}, ref, result) {
    transact(conn, [{':db/add': -1, 'name': result[0][1], 'query': ref }])
  },
}
