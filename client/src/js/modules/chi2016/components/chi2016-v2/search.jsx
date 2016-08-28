import React from 'react';
import {debounce} from './../../libs';

class Chi2016Search extends React.Component {
  constructor() {
    super();
    this.onHandleSearch = this.onHandleSearch.bind(this);
    this.onResetSearch = this.onResetSearch.bind(this);
  }
  onHandleBanner() {
    if (window) {
      window.location.assign('http://chi2016.acm.org');
    }
  }
  onResetSearch() {
    const {handleSearch, query} = this.props;
    this.search.value = '';
    handleSearch('SEARCH', this.search.value, query);
  }
  onHandleSearch() {
    const {handleSearch, query} = this.props;
    handleSearch('SEARCH', this.search.value, query);
  }
  render() {
    const searchRef = (c) => {
      this.search = c;
    };
    const {query} = this.props;
    const {search, tab} = query;
    const searchBarClass = tab === 'chi2016-app' ? 'chi2016-hidden' :
      `mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop
      mdl-cell--6-col-tablet mdl-cell--1-offset-tablet
      chi2016-search-container mdl-shadow--4dp`;
    return (
      <div className="mdl-grid mdl-grid--no-spacing chi2016-search">
        <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset-desktop
          mdl-cell--8-col-tablet mdl-cell--4-col-phone chi2016-banner"
        >
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--4-col mdl-cell--hide-tablet
              mdl-cell--hide-phone chi2016-banner-side "
            >
              <div className="mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell mdl-cell--12-col mdl-cell-hide-tablet
                  mdl-cell--hide-phone chi2016-text-banner left"
                >
                  <div className="chi2016-trinagle-right">
                  </div>
                  <div className="chi2016-text-banner-text">
                    {'San Jose, CA, USA'}
                  </div>
                  <div className="chi2016-trinagle-left">
                  </div>
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet
              mdl-cell--4-col-phone"
            >
              <div className="mdl-grid">
                <div
                  className="mdl-cell mdl-cell--12-col chi2016-logo"
                  onClick={this.onHandleBanner}
                >
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col mdl-cell--hide-tablet
              mdl-cell--hide-phone chi2016-banner-side "
            >
              <div className="mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell mdl-cell--12-col mdl-cell-hide-tablet
                  mdl-cell--hide-phone chi2016-text-banner right"
                >
                  <div className="chi2016-trinagle-left">
                  </div>
                  <div className="chi2016-text-banner-text">
                    {'May 7-12'}
                  </div>
                  <div className="chi2016-trinagle-right">
                  </div>
                </div>
              </div>
            </div>
            <div className={searchBarClass}
            >
              <div className="mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell chi2016-search-button-container">
                  <button
                    className="mdl-button mdl-js-button mdl-button--raised
                      mdl-js-ripple-effect chi2016-search-button"
                    onClick={this.onHandleSearch}
                  >
                    Search
                  </button>
                </div>
                <div className="mdl-cell chi2016-search-input-container"
                >
                  <div className="mdl-textfield mdl-js-textfield
                    chi2016-search-input-box"
                  >
                    <input
                      className="mdl-textfield__input chi2016-search-input"
                      type="text"
                      id="chi2016-search-header"
                      ref={searchRef}
                      defaultValue={search}
                      onChange={debounce(this.onHandleSearch, 500)}
                    />
                    <label
                      className="mdl-textfield__label chi2016-search-input-label"
                      htmlFor="search"
                    >
                      {'Type here...'}
                    </label>
                    <button
                      className="mdl-button mdl-js-button mdl-button--icon
                        chi2016-search-reset"
                      onClick={this.onResetSearch}
                      id="chi2016-search-reset-header"
                    >
                      <i className="material-icons">close</i>
                    </button>
                    <div
                      className="mdl-tooltip"
                      htmlFor="chi2016-search-reset-header"
                    >
                      {'Clear Search'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset-desktop
          mdl-cell--8-col-tablet mdl-cell--4-col-phone chi2016-banner-nav">
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset-desktop
              mdl-cell--8-col-tablet mdl-cell--hide-phone"
            >
              <a href="https://chi2016.acm.org/wp/">
                {'Home'}
              </a>
              <a href="https://chi2016.acm.org/wp/registration">
                {'Attending'}
              </a>
              <a href="https://chi2016.acm.org/wp/submissions">
                {'Authors'}
              </a>
              <a href="https://chi2016.acm.org/wp/sponsoring">
                {'Sponsoring'}
              </a>
              <a href="https://chi2016.acm.org/wp/recruiting">
                {'Recruiting'}
              </a>
              <a href="https://chi2016.acm.org/wp/exhibiting">
                {'Exhibiting'}
              </a>
              <a href="https://chi2016.acm.org/wp/organizers/">
                {'Organizers'}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chi2016Search;
