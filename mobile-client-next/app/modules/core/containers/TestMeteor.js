import TestMeteor from '../components/TestMeteor';
import { composeAll } from 'react-komposer-plus';
import { useDeps } from 'react-simple-di';

const mapDepsToProps = (context, actions) => ({
  meteorCall: () => console.log("actions.test.meteorCall"),
  testRedux: () => console.log("actions.layout.updateToolbarPosition"),
  login: () => console.log("actions.user.login"),
  context: () => context,
});

export default composeAll(
  useDeps(mapDepsToProps)
)(TestMeteor);
