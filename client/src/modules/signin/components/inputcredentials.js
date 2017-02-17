import React from 'react'

var Editor = React.createClass({
  getInitialState: function() {
    return {
      value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODcyOTgzOTcsImlhdCI6MTQ4NzI5ODM5NywiZXhwIjoxNDg3Mzg0Nzk3LCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.LmGCzd1AKYzamlpuyel6IRtp834VGUVWPTsSJlj8gN0c5tXvbauhzZzzIkNwcM6tmj45ZKwmhmmHtVi6NkMU5UHIEoCuKeU2d3IhjX1fTChw5DdcoyspK9TFRkBjlO7F7nl90GV0VfZrKClPbSY13e7-5CuqDdjlrBsmhk1GNNSDLnopUWc6oIgbOisKM1SSAk3H4-2vt8Ij53G0Bl6fGeF65Tj2wDFJR37h5FNa0O-zXDL0WbEpBJc7jhXNp3mL0qHp2ad--RoGihcWbedSLs7U2DKyTRRyHsejgGLZE4VrGzI7OggEMZVROqpN5uz0hIVHZcakfn_oOqvustwa9w'
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

