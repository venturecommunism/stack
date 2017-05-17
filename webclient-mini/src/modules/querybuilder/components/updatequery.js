import React from 'react'

var Editor = React.createClass({
  getInitialState: function(event) {
    const {result} = this.props
    return {
      value: result[0][2]
    }
  },
  handleChange: function(event) {
    const {updatequery} = this.props.actions

    this.setState({value: event.target.value})
    updatequery(event.target.value, result)
  },
  render: function() {
    return (
      <form id="noter-save-form">
        <textarea rows="8" cols="45" id="noter-text-area" name="textarea" value={this.state.value} onChange={this.handleChange}></textarea>
      </form>
    )
  }
})

export default Editor

