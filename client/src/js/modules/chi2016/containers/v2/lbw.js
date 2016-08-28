import ReactObject from './../../components/chi2016-v2/lbw.jsx';
import Loader from './../../components/chi2016-v2/loader.jsx';
import {useDeps, composeAll, compose} from 'mantra-core';
import {chi2016StoreComposer, lbwComposer, injectActions} from './composer-libs';

export default composeAll(
  compose(chi2016StoreComposer),
  compose(lbwComposer, Loader),
  useDeps(injectActions)
)(ReactObject);
