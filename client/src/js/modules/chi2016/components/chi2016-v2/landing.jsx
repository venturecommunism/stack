import React from 'react';
import zenscroll from 'zenscroll';
import Chi2016Dialog from './../../containers/v2/dialog';

class Chi2016Landing extends React.Component {
  componentDidMount() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
  }
  componentDidUpdate() {
    console.log('update landing');
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
  }
  goBackUp() {
    const main = document.getElementById('chi2016-main-content');
    setTimeout(() => {
      const scroller = zenscroll.createScroller(main, 1000);
      scroller.toY(0);
    }, 0);
  }
  renderSection(section, key) {
    return (
      <div
        className="mdl-cell mdl-cell--12-col chi2016-section"
        key={key}
      >
        {section()}
      </div>
    );
  }
  renderSections() {
    const {sections} = this.props;
    if (typeof sections === 'function') {
      return this.renderSection([ sections ]);
    }
    return sections.map((section, key) => {
      return this.renderSection(section, key);
    });
  }
  render() {
    return (
      <div className="chi2016-core-root">
        <div className="mdl-layout mdl-js-layout chi2016-landing">
          <main
            className="chi2016-landing-content mdl-layout__content"
            id="chi2016-main-content"
          >
            <div className="mdl-grid mdl-grid--no-spacing">
              {this.renderSections()}
            </div>
            <footer className="mdl-mini-footer">
              <div className="mdl-mini-footer__left-section">
                <div className="mdl-logo">CHI 2016 Full Program Mini-app</div>
                <ul className="mdl-mini-footer__link-list">
                  <li>
                    <a href="https://github.com/tjmonsi/chi2016-program">
                      Github
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/tjmonsi/chi2016-program/issues">
                      Submit an Issue / Bug Report
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
            <button
              className="mdl-button mdl-js-button mdl-button--fab mdl-button--raised
                mdl-js-ripple-effect chi2016-landing-up mdl-shadow--4dp"
              onClick={this.goBackUp}
            >
              <i className="material-icons">arrow_upward</i>
            </button>
            <Chi2016Dialog />
          </main>
        </div>
      </div>
    );
  }
}


Chi2016Landing.propTypes = {
  sections: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.func),
    React.PropTypes.func
  ])
};

Chi2016Landing.defaultProps = {
  sections: () => null,
};

export default Chi2016Landing;


