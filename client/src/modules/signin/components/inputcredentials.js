import React from 'react'

var Editor = React.createClass({
  getInitialState: function() {
    return {
    value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODc3MTczMTAsImlhdCI6MTQ4NzcxNzMxMCwiZXhwIjoxNDg3ODAzNzEwLCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.H3NxRxDiMjdYEBuBgtEvuRaNycEUwMqjlcq8RTEVIUZw1iny2G5-Kvo10tRxk9mlnv1y7mVqPj6K3OfNotDcvUC6GjoYKRPWxP9ZQ01Gl0kd-wymO9t0ml7UKKM6my84BUW4Xpie5aiZwrwE82fd8sTynO35XY_1UhgCskl_CHU20rrHDLbATcGhdctpiV88Ly47D-4JU6BTV3obFDulFQxCPd1YnsfURtYHnP1sjqCTgxX4qSgM5N2_vVXL4wET8CHLA8c_f8z-8eKBlO5HGENlIDb61y0uG_khiHdS-lzkBRhGcaRTve6nOtYVH1pZJfqoMffiPE9xL1sBul5mJQ'
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

