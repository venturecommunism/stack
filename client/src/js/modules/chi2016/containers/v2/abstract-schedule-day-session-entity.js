import ReactObject from './../../components/chi2016-v2/abstract-schedule-day-session-entity.jsx';
import Loader from './../../components/chi2016-v2/loader-2.jsx';
import {useDeps, composeAll, compose} from 'mantra-core';
import {chi2016StoreComposer, entityComposer, injectActions} from './composer-libs';

const composer = ({hiddenCallback, session}, onData) => {
  onData(null, {hiddenCallback});
};

export default composeAll(
  compose(composer),
  compose(chi2016StoreComposer),
  compose(entityComposer, Loader),
  useDeps(injectActions)
)(ReactObject);
