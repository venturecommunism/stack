import React from 'react'

var Editor = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.result[0][2]
    }
  },
  handleChange: function(event) {
    const {updatequery} = this.props.actions
    const {result} = this.props

    this.setState({value: event.target.value})
    updatequery(event.target.value, result)
  },
  render: function() {
//    const {result, actions} = this.props
    return (
      <form id="noter-save-form">
        <textarea rows="8" cols="45" id="noter-text-area" name="textarea" value={this.state.value} onChange={this.handleChange}></textarea>
      </form>
    )
  }
})

export default Editor
