import React from 'react';

class Chi2016Loader extends React.Component {
  render() {
    const loaderHeadRef = (c) => {
      if (componentHandler && c) {
        componentHandler.upgradeElement(c);
      }
    };
    return (
      <div
        className="mdl-grid chi2016-loader"
        ref={loaderHeadRef}
      >
        <div
          className="mdl-cell mdl-cell--12-col chi2016-loader-container"
          ref={loaderHeadRef}
        >
          <span
            className="mdl-spinner mdl-js-spinner is-active chi2016-loader-icon"
            ref={loaderHeadRef}
          >
          </span>
        </div>
      </div>
    );
  }
}

export default Chi2016Loader;
