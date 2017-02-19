import React from 'react'

var Editor = React.createClass({
  getInitialState: function() {
    return {
      value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODc1MTU1MzUsImlhdCI6MTQ4NzUxNTUzNSwiZXhwIjoxNDg3NjAxOTM1LCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.K2j4Gu9zGLbP-agSe-VwrxRtvJcPxbeSb9lJN97Yoos84-EArZL2ScFID4QaqHQy_vLvUma00UJl9c5dVD-L4Haom42d1xi_BvEyvOdb6A42wiMEhV_xxgj62k8ZtW9tDL-mqUiKMS3mOghhAwlhSmmAboB2ZS5Ic99LtvxY1rFkfZVZ6dht9VtexxV7Jv7qvnFToOrDBJBjoLM7r9ewm8LVt3b-kNOGM7Psv2ZfklNhoREvE9S7U94X_aFrsJfvvBF2Rj2-BtH6n_o1F8Ym1Qwz0wTDa1epOf3n9yeHZWghLIIH6gNdCxb7COV_oe667H2bMSMEe9Tq2EXG55f9lg'
    }
  },
  handleChange: function(event) {
    const {inputcredentials} = this.props.actions.inputcredentials
    const {result} = this.props

    this.setState({value: event.target.value})
    inputcredentials(event.target.value, result)
  },
  render: function() {
    const {result, actions} = this.props
    return (
      <form id="noter-save-form">
        <textarea rows="20" cols="45" id="noter-text-area" name="textarea" value={this.state.value} onChange={this.handleChange}></textarea>
      </form>
    )
  }
})

export default Editor

