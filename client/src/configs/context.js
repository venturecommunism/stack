import url from './url'
import createDBConn from '../lib/createDBConn'
import datascript from 'datascript'
import { Socket } from 'phoenix'

const conn = createDBConn()

const transactstate = (data, txMsg) => {
  datascript.transact(conn, data, txMsg);
}

export const initContext = () => {
  return {
    socket: new Socket(url),
    transactstate,
    conn,
  }
}
