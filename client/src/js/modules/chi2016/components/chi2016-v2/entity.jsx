import React from 'react';
import Highlighter from 'react-highlight-words';

class Chi2016Entity extends React.Component {
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
        alt = 'Best Paper'
      />
    );
  }
  renderAuthors(authors, searchWords) {
    return authors && authors.length ? authors.map((author, key) => {
      const {name, location, affiliation} = author;
      return (
        <div className="mdl-cell mdl-cell--12-col chi2016-entity-author">
          <span className="chi2016-entity-author-name">
            <Highlighter
              highlightClassName="highlight"
              searchWords={searchWords}
              textToHighlight={name}
            />
          </span>{', '}
          <span className="chi2016-entity-author-affiliation">
            <Highlighter
              highlightClassName="highlight"
              searchWords={searchWords}
              textToHighlight={affiliation}
            />
          </span>{', '}
          <span className="chi2016-entity-author-location">
            <Highlighter
              highlightClassName="highlight"
              searchWords={searchWords}
              textToHighlight={location}
            />
          </span>
        </div>
      );
    }) : null;
  }
  render() {
    const {entity, query} = this.props;
    const {search} = query;
    const {authors, keywords, abstract, hm, award} = entity;
    const searchWords = search && search.trim() !== '' ?
        search.split(/\s/).filter(word => word) : [];
    return (
      <div className="mdl-grid mdl-grid--no-spacing chi2016-entity">
        <div className="mdl-cell mdl-cell--12-col">
          <div className="mdl-grid mdl-grid--no-spacing chi2016-entity-authors">
            <div className="mdl-cell mdl-cell--12-col chi2016-entity-authors-title">
              <h4>{'Authors: '}</h4>
            </div>
            {this.renderAuthors(authors, searchWords)}
          </div>
        </div>
        <div className="mdl-cell mdl-cell--12-col">
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--12-col chi2016-entity-keywords">
              <span className="chi2016-entity-keywords-title">
                <h4>{'Keywords: '}</h4>
              </span>
              <span className="chi2016-entity-keywords-text">
              <Highlighter
                highlightClassName="highlight"
                searchWords={searchWords}
                textToHighlight={keywords && keywords.length ? keywords.join(', ') : ''}
              />
            </span>
            </div>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--12-col">
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--12-col chi2016-entity-awards">
              <span className="chi2016-entity-awards-title">
                <h4>{'Awards: '}</h4>
              </span>
              {award ? this.renderAward() : null}
              {hm ? this.renderHonorable() : null}
            </div>
          </div>
        </div>

        <div className="mdl-cell mdl-cell--12-col">
          <div className="mdl-grid mdl-grid--no-spacing chi2016-entity-abstract">
            <div className="mdl-cell mdl-cell--12-col chi2016-entity-abstract-title">
              <h4>{'Abstract: '}</h4>
            </div>
            <div className="mdl-cell mdl-cell--12-col chi2016-entity-abstract-text">
              <Highlighter
                highlightClassName="highlight"
                searchWords={searchWords}
                textToHighlight={abstract ? abstract : ''}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chi2016Entity;

//
