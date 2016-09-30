import url from './url'
import createDBConn from '../lib/createDBConn'
import { Socket } from 'phoenix'
import datascript from 'datascript'

export const initContext = () => {
  return {
    socket: new Socket(url),
    conn: createDBConn(),
    transact: datascript.transact,
  }
}
