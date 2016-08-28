import ReactObject from './../../components/chi2016-v2/abstract-schedule.jsx';
import Loader from './../../components/chi2016-v2/loader.jsx';
import {useDeps, composeAll, compose} from 'mantra-core';
import {chi2016StoreComposer, scheduleComposer, injectActions} from './composer-libs';

export default composeAll(
  compose(chi2016StoreComposer),
  compose(scheduleComposer, Loader),
  useDeps(injectActions)
)(ReactObject);
