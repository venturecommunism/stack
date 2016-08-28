import ReactObject from './../../components/chi2016-v2/abstract-schedule-day-session.jsx';
import Loader from './../../components/chi2016-v2/loader-2.jsx';
import {useDeps, composeAll, compose} from 'mantra-core';
import {chi2016StoreComposer, sessionComposer, injectActions} from './composer-libs';

export default composeAll(
  compose(chi2016StoreComposer),
  compose(sessionComposer, Loader),
  useDeps(injectActions)
)(ReactObject);
