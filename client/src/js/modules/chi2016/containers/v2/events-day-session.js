import ReactObject from './../../components/chi2016-v2/events-day-session.jsx';
import {useDeps, composeAll, compose} from 'mantra-core';
import {chi2016StoreComposer, otherSessionsComposer} from './composer-libs';

export default composeAll(
  compose(chi2016StoreComposer),
  compose(otherSessionsComposer),
  useDeps()
)(ReactObject);
