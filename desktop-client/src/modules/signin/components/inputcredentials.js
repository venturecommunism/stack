import React from 'react'

var Editor = React.createClass({
  getInitialState: function() {
    return {
      value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODcxMTE2NjQsImlhdCI6MTQ4NzExMTY2NCwiZXhwIjoxNDg3MTk4MDY0LCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.pqcMDbUSeSX04fSwaOXqb7it6cBy6QaJhB_Ee7IrlJZtMYlVML7zmfB3FU7O494Qkh8n1luXKFSlEeytCNx5HHBSCCtOsBIG6aaqSmW-u2awwQgpzMFFD5MUTNqnOFnjw3DjPubNIQqMbC9Y5c7xvWlz6GFwP7YEOwjCVTitf1wEhN3b2iNBUF5DtUukFMnEMv2pEPi9PAzY0LzJHzJRg9Ntc7jqKi060ELppOcjOV1GSs-ofF1Z--xNXZbi5vULaYEyh6inN0wFDdoEz1lq6xSJUSFRMgCbULXRCqhtaK1A2Fhqg3aTRPInavXnJutozlgUYI7sbyXtVKbNSEWUyA'
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
        <textarea rows="8" cols="45" id="noter-text-area" name="textarea" value={this.state.value} onChange={this.handleChange}></textarea>
      </form>
    )
  }
})

export default Editor

