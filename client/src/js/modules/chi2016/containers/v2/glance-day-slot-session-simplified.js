import ReactObject from './../../components/chi2016-v2/glance-day-slot-session-simplified.jsx';
// import Loader from './../../components/chi2016-v2/loader.jsx';
import {useDeps, composeAll, compose} from 'mantra-core';
import {chi2016StoreComposer, sessionComposer, injectActions} from './composer-libs';

const composer = ({runScroller}, onData) => {
  onData(null, {runScroller});
};

export default composeAll(
  compose(composer),
  compose(chi2016StoreComposer),
  compose(sessionComposer),
  useDeps(injectActions)
)(ReactObject);
