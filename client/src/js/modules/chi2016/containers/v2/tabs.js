import ReactObject from './../../components/chi2016-v2/tabs.jsx';
import {useDeps, composeAll, compose} from 'mantra-core';

const injectActions = (context, actions) => ({
  context: () => (context),
  handleTabs: actions.chi2016.handleTabs
});

const composer = ({query}, onData) => {
  onData(null, {query});
};

export default composeAll(
  compose(composer),
  useDeps(injectActions)
)(ReactObject);
