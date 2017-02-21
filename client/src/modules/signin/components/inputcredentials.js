import React from 'react'

var Editor = React.createClass({
  getInitialState: function() {
    return {
    value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODc2Mjk5MjYsImlhdCI6MTQ4NzYyOTkyNiwiZXhwIjoxNDg3NzE2MzI2LCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.iYZtlX1A1zPa2DjuymIP-Ml5Epl1_xvnd1TSf6NmUVqOUyvLLhNqLL7sBtb6vJXQOzaac796K4tH66YlehO6-Q4ZdBpFr97U8_Dq27aawJyZXE8YHqWRrqOHkWzAnyt-xLjZPLHn4CBLiNYJA5dGJbkmF0NubFN_LXcTTufUpsKcVSnOjcfv8sdWelFHj1vnYFhLAi8M4NkIgwjNID-vMyA8XsVxVCG-NnLON_fghdhskNkaLqH-_4Z4FV0brxuD46YTQ6gVkFv7BYKQt9tZT0OrrGCkun_1cEZ5Z0tj8vqoL-8uIKx7LBVEPGkLNlaEf5irKQUBPi-GzwrX45gv2Q'
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

