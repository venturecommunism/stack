import { composeAll } from 'mantra-core'
import { useDeps } from '/lib/helpers/usedeps'

export default (actionset, component) => composeAll(
  useDeps(actionset)
)(component)
