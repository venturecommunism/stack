import Firebase from 'firebase';
const location = 'https://vivid-heat-7288.firebaseio.com/';
import {mount} from 'react-mounter';
import page from 'page';
import qs from 'qs';
import chi2016Store from './chi2016-store';
import _ from 'underscore';
import {Socket} from 'phoenix'


export const initContext = () => {
  return {
    mount,
    location,
    Firebase,
    chi2016Store,
    page,
    qs,
    _,
    socket: new Socket('http://xx.xxx.xxx.xxx/socket')
  };
};
