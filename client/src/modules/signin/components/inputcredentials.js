import React from 'react'

var Editor = React.createClass({
  getInitialState: function() {
    return {
      value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODg5MTQ1OTgsImlhdCI6MTQ4ODkxNDU5OCwiZXhwIjoxNDg5MDAwOTk4LCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.GKeFRrti7F7QAYqSEmlJMHJOT5vZ27_j8iExt20qjdruwibx8yoLz67D2B7FfYaSN0iSrWgGiB40dRrvqGXf2NtxX2w_fUPSWhllUbV2_6KK7-a2Zp9sgMI7cFYUVv092F_mn1x8MQBKer6eUnvd7gzrKDLqyU2JZHV6PTHvZ6ebKmiOhMnVeptQ7ssIfCMVBeynovL2ZE9KGOXSwe9C5YIpqpJJTUA-oel3UrlKq8NpC6GMoBuLaN5WHs0jQzzVqkvHnVfgaHU9rnxIGFtaTUUvmLrCbPZbKi6TAGFO73LV7L75MYBhC6Dg3AbmYhgiFzwFT3l_YRMLXFgbjNpstg'
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

