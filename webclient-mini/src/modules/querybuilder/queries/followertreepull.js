import { withDatascriptQuery } from '../../../lib/react-datascript'

/**
 * A higher order component that declares a recursive pull query to walk all followers
 * for a given user (the output is a tree, rooted by the user)
 *
 */
const followerTreePullQuery = withDatascriptQuery({
  pull: '["name", {"_follows" ...}]'
})

export default followerTreePullQuery
