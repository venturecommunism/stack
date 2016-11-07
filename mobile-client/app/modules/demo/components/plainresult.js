import React from 'react'

import {View, Text} from 'react-native'

const PlainResultComponent = ({ result }) => (
  <View>
    <Text>Stringified Result </Text>
    <Text>
        {JSON.stringify(result, null, 2)}
    </Text>
  </View>
)

export default PlainResultComponent
