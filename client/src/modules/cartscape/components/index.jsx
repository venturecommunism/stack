import ActionsMapper from '../../core/containers/actionsmapper'
import CartScapeComponent from './cartscape.jsx'
import fullScreenQuery from '../../layout/queries/fullscreen'
export default fullScreenQuery(ActionsMapper('togglefullscreen', CartScapeComponent))
