import React from 'react';

class Chi2016Banner extends React.Component {
  componentDidMount() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
  }
  componentDidUpdate() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
  }
  onHandleBanner() {
    if (window) {
      window.location.assign('http://chi2016.acm.org');
    }
  }
  render() {
    return (
      <div className="mdl-grid mdl-grid--no-spacing chi2016-search">
        <div
          className="mdl-cell mdl-cell--10-col mdl-cell--1-offset-desktop
          mdl-cell--8-col-tablet mdl-cell--4-col-phone chi2016-banner"
          onClick={this.onHandleBanner}
        >
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--4-col mdl-cell--hide-tablet
              mdl-cell--hide-phone chi2016-banner-side"
            >

            </div>
            <div className="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet
              mdl-cell--4-col-phone chi2016-logo"
            >
            </div>
            <div className="mdl-cell mdl-cell--4-col mdl-cell--hide-tablet
              mdl-cell--hide-phone chi2016-banner-side"
            >

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Chi2016Banner;
