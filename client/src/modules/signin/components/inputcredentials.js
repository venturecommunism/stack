import React from 'react'

var Editor = React.createClass({
  getInitialState: function() {
    return {
      value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODk0MjYwNTUsImlhdCI6MTQ4OTQyNjA1NSwiZXhwIjoxNDg5NTEyNDU1LCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.B_h8qOrvVUrVs_cxwqjQxFVFgFeeTADwuC5112ZrnNbtfBRQxacZ3hw7cCy_vltSkaEJo9pql4CtZLlgkdeqDfkmHHlzRYN1FdWW1JTUOO3bzkTu7Tlje4-8U9E9YKa9pm58SYtwehokvcAoq92xVueKiRJDGCaUWurzLTIPe6RY5ry4t9LuW0fplAFAKr2fprfFt26qBqI8qoxBBtKn8ChWjJ2xGiGLXg18Ay3dQ3Zw-z8A9N7IRk30jiwhYktTCPrhKDlZsiFkNimAbt-M5IADGobXj12neJ7izWYF7nDbLc57l4KUN8Prh4e-SETyBTGvKe8VJlW22_W5wFpWcw'
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

