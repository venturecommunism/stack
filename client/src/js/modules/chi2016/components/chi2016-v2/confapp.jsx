import React from 'react';

class Chi2016Confapp extends React.Component {
  componentDidMount() {
    loadConfApp();
  }
  render() {
    return (
      <div className="mdl-grid mdl-grid--no-spacing chi2016-confapp">
        <div className="mdl-cell mdl-cell--12-col chi2016-confapp-container">
          <div className='container' id='program'></div>
        </div>

      </div>
    );
  }
}

export default Chi2016Confapp;
