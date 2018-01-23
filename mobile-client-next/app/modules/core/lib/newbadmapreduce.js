import React from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

// https://javascriptplayground.com/functional-stateless-components-react/


class TestThing extends React.Component {
  render(){
    return (
      <Text>Okay</Text>
    )
  }
}

class Inputs extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    formvalue: ''
  }
  handleInput = (text) => {
    this.setState({ formvalue: text })
  }
  submittask = (formvalue) => {
    this.props.actions[this.props.component.componentsname](formvalue)
  }
  render(){
    return (
      <View style = {styles.container}>
        <Text>Okay</Text>
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Enter your task here."
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"
          onChangeText = {this.handleInput}/>

        <TouchableOpacity
          style = {styles.submitButton}
          onPress = {
            () => this.submittask(this.state.formvalue)
          }>
          <Text style = {styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText:{
    color: 'white'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

const badmapreduce = function (result, actions, moduleroot) {
  const doswitch = function (key, component) {
    switch(component.componentstype) {
      case undefined:
      case null:
        // this better be a string
        return <View><Text>{component}</Text></View>
      case "action":
        return <Inputs actions={actions} component={component} />
//        return <Button title={component.componentsname} key={key} onPress={actions[component.componentsname]} accessibilityLabel={component.componentsname} />
      case "subcomponent":
        // just return the component's name in subcomponents for now
        return <Text key={key} style={styles.titleText}>{component.componentsname}</Text>
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

