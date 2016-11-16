import React from 'react'

import {
  View,
  Text,
  ListView
} from 'react-native'

/*
export default ({ result }) => (
  <View>
    <Text>Twitter Stream</Text>
    <View>
      <ListView
        dataSource={result}
      />
    </View>


  </View>
)
*/

class ListviewExample extends React.Component {

  constructor (props) {
    super(props)


    const dataObjects = [
      {title: 'First Title', description: 'First Description'},
      {title: 'Second Title', description: 'Second Description'},
      {title: 'Third Title', description: 'Third Description'},
      {title: 'Fourth Title', description: 'Fourth Description'},
      {title: 'Fifth Title', description: 'Fifth Description'},
      {title: 'Sixth Title', description: 'Sixth Description'},
      {title: 'Seventh Title', description: 'Seventh Description'},
      {title: 'Eighth Title', description: 'Eighth Description'},
      {title: 'Ninth Title', description: 'Ninth Description'},
      {title: 'Tenth Title', description: 'Tenth Description'},
      {title: 'Eleventh Title', description: 'Eleventh Description'},
      {title: '12th Title', description: '12th Description'},
      {title: '13th Title', description: '13th Description'},
      {title: '14th Title', description: '14th Description'},
      {title: '15th Title', description: '15th Description'},
      {title: '16th Title', description: '16th Description'},
      {title: '17th Title', description: '17th Description'},
      {title: '18th Title', description: '18th Description'},
      {title: '19th Title', description: '19th Description'},
      {title: '20th Title', description: '20th Description'},
      {title: 'BLACKJACK!', description: 'BLACKJACK! Description'}
    ]

console.log(dataObjects)
    const dataResult = this.props.result
console.log("dataResult", dataResult)
    const rowHasChanged = (r1, r2) => r1 !== r2

    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: ds.cloneWithRows(dataObjects)
    }

  }

  /* ***********************************************************
  * STEP 3
  * `_renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/
  _renderRow (rowData) {
    return (
      <View>
        <Text>{rowData.title}</Text>
        <Text>{rowData.description}</Text>
      </View>
    )
  }

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
    componentWillReceiveProps (newProps) {
      if (newProps.someData) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
        })
      }
    }
  *************************************************************/

  render () {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    )
  }
}

export default ListviewExample
