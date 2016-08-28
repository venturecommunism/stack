import ReactObject from './../../components/chi2016-v2/search.jsx';
import {useDeps, composeAll, compose} from 'mantra-core';

const injectActions = (context, actions) => ({
  context: () => (context),
  handleSearch: actions.chi2016.handleSearch
});

const composer = ({context, query}, onData) => {
  const {chi2016Store} = context();
  const getState = () => {
    const {flags, searchTypes} = chi2016Store.getState();
    onData(null, {flags, searchTypes, query});
  };
  getState();
  return chi2016Store.subscribe(getState);
};

export default composeAll(
  compose(composer),
  useDeps(injectActions)
)(ReactObject);
