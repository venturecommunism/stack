import ReactObject from './../../components/chi2016-v2/dialog.jsx';
import {useDeps, composeAll, compose} from 'mantra-core';

const injectActions = (context, actions) => ({
  context: () => (context),
  registerDialog: actions.chi2016.registerDialog
});

export default composeAll(
  // compose(composer),
  useDeps(injectActions)
)(ReactObject);
