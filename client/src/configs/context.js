import url from './url'
import createDBConn from '../lib/createDBConn'
import { Socket } from 'phoenix'
import datascript from 'datascript'

const socket = new Socket(url)
const conn = createDBConn()

var log = []
var meta = []
datascript.listen(conn, function(report) {
  log.push(report.tx_data)
  meta.push(report.tx_meta)
})

export const initContext = () => {
  return {
    socket: socket,
    conn: conn,
    transact: datascript.transact,
    log: log,
    meta: meta,
  }
}
