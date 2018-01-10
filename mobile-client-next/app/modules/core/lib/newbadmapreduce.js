import React from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

const badmapreduce = function (result, actions, moduleroot) {
  const doswitch = function (key, component) {
    switch(component.componentstype) {
      case undefined:
      case null:
        // this better be a string
        return <View><Text>{component}</Text></View>
      case "action":
        return <Button title={component.componentsname} key={key} onPress={(e) => console.log(e)} accessibilityLabel={component.componentsname} />
      case "subcomponent":
        // just return the component's name in subcomponents for now
        return <Text key={key}>{component.componentsname}</Text>
      case "textarea":
        return <TextInput multiline={true} numberOfLines={4} key={key} placeholder={component.placeholder} />
      default:
        // we didn't find a component type but it's not a string. consider this an error
        console.warn("Unhandled component type in switch statement at apps/core/libs/badmapreduce.js (or where ever it is)")
        return <View><Text>Error: {JSON.stringify(component, null, 2)}</Text></View>
    }
  }

  var elements =
    moduleroot.map( function(onesetofdatafilledcomponents, pIndex) {
      return onesetofdatafilledcomponents.map( function(component, sIndex) {
        var key = pIndex + "." + sIndex
        return doswitch(key, component)
      })
    })
  return <View>{elements}</View>
}

export default badmapreduce

