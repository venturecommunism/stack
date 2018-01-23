import React from 'react'

import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

const PlainResultComponent = ({ result, actions }) => (
  <View>
    <TouchableHighlight onPress={() => console.log("actions.addfollowerofjane")}>
      <Text>Demo Module ADD FOLLOWER OF JANE</Text>
    </TouchableHighlight>
    <Text>Stringified Result </Text>
    <Text>
        {JSON.stringify(result, null, 2)}
    </Text>
  </View>
)

export default PlainResultComponent
