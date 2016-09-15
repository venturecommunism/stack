import {createStore} from 'redux';

const chi2016DefaultState = {
  search: '',
  flags: [
    'all-flag',
    'altchi',
    'casestudy',
    'course',
    'panel',
    'SIG',
    'TOCHI',
    'paper'
  ],
  searchTypes: [
    'all-type',
    'paper-title',
    'abstract',
    'keywords',
    'author',
    'affiliation',
    'location',
    'session-chair',
    'session-title'
  ],
  dialog: null
};

export default createStore((state = chi2016DefaultState, action) => {
  switch (action.type) {
    case 'REGISTER_DIALOG':
      return Object.assign({}, state, {
        dialog: action.value
      });
    case 'CLEAR':
      return chi2016DefaultState;
    case 'CLEAR_SEARCH':
      return Object.assign({}, state, {
        search: ''
      });
    case 'SEARCH':
      return Object.assign({}, state, {
        search: action.value
      });
    case 'CLEAR_FLAG':
      return Object.assign({}, state, {
        flags: []
      });
    case 'ALL_FLAG':
      return Object.assign({}, state, {
        flags: chi2016DefaultState.flags
      });
    case 'ADD_FLAG':
      return state.flags.indexOf(action.value) > -1 ? state :
        Object.assign({}, state, {
          flags: [
            ...state.flags,
            action.value
          ]
        });
    case 'REMOVE_FLAG':
      const index = state.flags.indexOf(action.value);
      return index < 0 ? state :
        Object.assign({}, state, {
          flags: [
            ...state.flags.slice(0, index),
            ...state.flags.slice(index + 1)
          ]
        });
    case 'CLEAR_TYPE':
      return Object.assign({}, state, {
        searchTypes: []
      });
    case 'ALL_TYPES':
      return Object.assign({}, state, {
        searchTypes: chi2016DefaultState.searchTypes
      });
    case 'ADD_TYPE':
      return state.searchTypes.indexOf(action.value) > -1 ? state :
        Object.assign({}, state, {
          searchTypes: [
            ...state.searchTypes,
            action.value
          ]
        });
    case 'REMOVE_TYPE':
      const index2 = state.searchTypes.indexOf(action.value);
      return index2 < 0 ? state :
        Object.assign({}, state, {
          searchTypes: [
            ...state.searchTypes.slice(0, index2),
            ...state.searchTypes.slice(index2 + 1)
          ]
        });
    default:
      return state;
  }
});
