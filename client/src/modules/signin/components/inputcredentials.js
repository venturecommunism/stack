import React from 'react'

var Editor = React.createClass({
  getInitialState: function() {
    return {
    value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODc4MzAwOTAsImlhdCI6MTQ4NzgzMDA5MCwiZXhwIjoxNDg3OTE2NDkwLCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.fhwbsTEcuxCbDewpPFNWI0bH5bKmv4QLlylpE1tIP2pBHuUJ74xWjx1iKZdpwFxUTh-1i5txSIJomXQtVW9pG7ObQO3oPsKsKBMcTreU7mWzrlQ3AaClBwQOeLnR38irDa3fxzKQHl6QsRwXhirImYAsysRPuxGYTGaCkNF0rBGwOoW7hXUt7v6GeY1TbQZN8vuUOdc7xzT2FCpyrQW1qL74UyfbfOzB7k2oxjiE1EjvZmu8u1JVcRCDWefkjO5dcoAjY06j6WW2hNhpWEYMycFr-J_Rpg4iAwfj41s7v0SWuB4Ji4D0JwOmxxagQmjhvUcNXDKmee19o4wBx7kY7g'
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

