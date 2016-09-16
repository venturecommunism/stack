import url from './url'

import { Socket } from 'phoenix'

export const initContext = () => {
  return {
    socket: new Socket(url)
  }
}
