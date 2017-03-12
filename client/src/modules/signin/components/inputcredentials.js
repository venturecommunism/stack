import React from 'react'

var Editor = React.createClass({
  getInitialState: function() {
    return {
      value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODkyNzIwNTMsImlhdCI6MTQ4OTI3MjA1MywiZXhwIjoxNDg5MzU4NDUzLCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.a6y1RjGhasZzwQbFKAYKF3Ft_fshu60tCHPaEFzbu_U-0FHffjDx0cFiBPvtwgNjKD7U2T_I2r_IU-BHayp4sInDaOGgwEns0q_uoXFX8gzTFOvdGcaDuVIEZhmt7lHaueQp2BqiYtk3iJFLI34Z6T3hPl3ER_-X0UYZEh9NwWHgNWsO0w16ODqsABJBb8FqZMb5n92vcr6doJd_lB-mfJoUtwsBlHXsssXnYENPgeGQ5SMjH71bNZJ06SSVyqLOvu6yC51BYQBQsf6a-iyp3yv3jVodQqE077pztXzD7Ra6YI7B5AqnJ3c9nFgWK1nDgQKSosFMmXiY7oq-FqGQ2Q'
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

