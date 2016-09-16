//import {mount} from 'react-mounter'
import {Socket} from 'phoenix'

export const initContext = () => {
  return {
//    mount,
    socket: new Socket('http://xx.xxx.xxx.xxx/socket')
  }
}
