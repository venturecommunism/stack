import React from 'react'

class CreateTask extends React.Component {
  render() {
    const {error} = this.props
    return (
      <div className="new-task">
        {error ? <p style={{color: 'red'}}>{error}</p> : null}

        <textarea ref="descriptionRef" placeholder="Enter your JSON-LD data." /> <br/>
        <button onClick={this.createTask.bind(this)}>Import</button>
      </div>
    )
  }

  createTask() {
    const {importdata} = this.props.actions
    const {descriptionRef} = this.refs

    importdata(descriptionRef.value)
  }
}

export default CreateTask
