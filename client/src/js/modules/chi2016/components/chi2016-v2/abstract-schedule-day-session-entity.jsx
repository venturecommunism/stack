import React from 'react';
import Chi2016Entity from './entity.jsx';
import Highlighter from 'react-highlight-words';
import _ from 'underscore';

class Chi2016ScheduleDaySessionEntity extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.entity, nextProps.entity) ||
      this.props.query.search !== nextProps.query.search;
  }
  renderHonorable() {
    return (
      <img
        className = 'chi2016-honorable-icon'
        src = 'src/images/icon_1199.png'
        alt = 'Honorable Mention'
      />
    );
  }
  renderAward() {
    return (
      <img
        className = 'chi2016-award-icon'
        src = 'src/images/icon_1198.png'
        alt = 'Best Award'
      />
    );
  }
  render() {
    const {entity, query, hiddenCallback, dialog, session, id} = this.props;
    const {search, searchRegex} = query;
    if (entity) {
      const {award, hm, title, authors, abstract, keywords} = entity;
      const reducer = (p, q) => {
        const newP = typeof p === 'string' ? p.toLowerCase().trim().match(searchRegex) : p;
        return newP || q.toLowerCase().trim().match(searchRegex);
      };
      // console.log(searchRegex);
      const authorset = authors && authors.map((author) => (author.name)).reduce(reducer);
      const authorsetFlag = typeof authorset === 'string' ?
        authorset.toLowerCase().trim().match(searchRegex) : authorset;
      const affiliation = authors && authors.map((author) => (author.affiliation)).reduce(reducer);
      const affiliationFlag = typeof affiliation === 'string' ?
        affiliation.toLowerCase().trim().match(searchRegex) : affiliation;
      const location = authors && authors.map((author) => (author.location)).reduce(reducer);
      const locationFlag = typeof location === 'string' ?
        location.toLowerCase().trim().match(searchRegex) : location;
      const keywordsFlag = keywords && keywords.reduce(reducer);
      const newKeywordsFlag = typeof keywordsFlag === 'string' ?
        keywordsFlag.toLowerCase().trim().match(searchRegex) : keywordsFlag;

      const flag = !search || search.trim() === '' ||
        (abstract && abstract.toLowerCase().trim().match(searchRegex)) ||
        (title && title.toLowerCase().trim().match(searchRegex)) ||
        authorsetFlag ||
        affiliationFlag ||
        locationFlag ||
        newKeywordsFlag ||
        false;
      const className = !flag ?
        'chi2016-abstract-schedule-day-session-entity chi2016-hidden' :
        'chi2016-abstract-schedule-day-session-entity';

      setTimeout(hiddenCallback, 500);
      const searchWords = search && search.trim() !== '' ?
        search.split(/\s/).filter(word => word) : [];
      return (
        <div
          className={className}
          id = {`${id}-abstract-schedule-day-session-entity`}
        >
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet
              mdl-cell--1-col-phone chi2016-abstract-schedule-day-session-entity-award"
            >
              {award ? this.renderAward() : null}{hm ? this.renderHonorable() : null}
            </div>
            <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet
              mdl-cell--3-col-phone chi2016-abstract-schedule-day-session-entity-text-container"
            >
              <div className="mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell mdl-cell--12-col
                  chi2016-abstract-schedule-day-session-entity-text-title">
                  <h3>
                    <Highlighter
                      highlightClassName="highlight"
                      searchWords={searchWords}
                      textToHighlight={title}
                    />
                  </h3>
                </div>
                <div className="mdl-cell mdl-cell--12-col
                  chi2016-abstract-schedule-day-session-entity-container">
                  <Chi2016Entity
                    entity={entity}
                    query={query}
                    session={session}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // console.log(hiddenCallback);
    // setTimeout(hiddenCallback, 500);
    return null;
  }
}

export default Chi2016ScheduleDaySessionEntity;
