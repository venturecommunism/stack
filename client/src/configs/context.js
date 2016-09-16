import url from './url'
//import createDBConn from '../lib/createDBConn'
import { Socket } from 'phoenix'

export const initContext = () => {
  return {
    socket: new Socket(url),
//    conn: createDBConn(),
  }
}
