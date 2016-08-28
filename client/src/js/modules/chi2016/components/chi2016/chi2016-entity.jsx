import React from 'react';
import {trimWords} from './../../libs';

class Chi2016Entity extends React.Component {
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
  renderAuthors(authors) {
    return authors.map((author, key) => {
      const {name, location, institution} = author;
      return (
        <div
          className="mdl-cell mdl-cell--12-col chi2016-entity-author"
          key={key}
        >
          <span name="chi2016-entity-author-name">
            {`- ${name}`}
          </span>{institution || location ? ', ' : ''}
          <span name="chi2016-entity-author-affiliation-location">
            {institution}{location && institution ? ', ' : ''}{location}
          </span>
        </div>
      );
    });
  }
  checkAuthors(authors) {
    if (authors && authors.length > 0) {
      return (
        <div className="chi2016-entity-authors">
          <span className="chi2016-entity-authors-title">{'Authors'}</span>
          <div className="mdl-grid mdl-grid--no-spacing">
            {this.renderAuthors(authors)}
          </div>
        </div>
      );
    }
  }
  renderAbstract(abstract, cAndB) {
    const text = cAndB ? cAndB : abstract;
    if (text && text.trim() !== '') {
      return (
        <div className="chi2016-entity-abstract-container">
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--12-col chi2016-entity-abstract-title">
              {'Abstract: '}
            </div>
            <div className="chi2016-entity-abstract">
              {trimWords(text, 50)}
            </div>
          </div>
        </div>
      );
    }
  }
  renderHonorable() {
    return (
      <img
        className = 'chi2016-honorable-icon'
        src = 'src/images/icon_1199.png'
      />
    );
  }
  renderAward() {
    return (
      <img
        className = 'chi2016-award-icon'
        src = 'src/images/icon_1198.png'
      />
    );
  }
  renderAwards(a, h) {
    if (a & h) {
      return (
        <span>
          {this.renderAward()}
          {this.renderHonorable()}
        </span>
      );
    } else if (a) {
      return this.renderAward();
    } else if (h) {
      return this.renderHonorable();
    }
  }
  render() {
    const {entity, id} = this.props;
    if (entity) {
      const {title, abstract, authors, award, hm, cAndB} = entity;
      // if (!abstract || abstract.trim() === '') console.log(title, cAndB)
      return (
        <div
          className="mdl-grid mdl-grid--no-spacing chi2016-entity-container"
          id={id}
        >
          <div className="mdl-cell mdl-cell--12-col">
            <h3 className="chi2016-entity-title">{this.renderAwards(award, hm)}{title}</h3>
          </div>
          {this.checkAuthors(authors)}
          {this.renderAbstract(abstract, cAndB)}
        </div>
      );
    }
    return null;
  }
}

Chi2016Entity.propTypes = {
  id: React.PropTypes.string,
  entity: React.PropTypes.shape({
    abstract: React.PropTypes.string,
    authors: React.PropTypes.arrayOf(React.PropTypes.shape({
      affiliation: React.PropTypes.string,
      location: React.PropTypes.string,
      name: React.PropTypes.string
    })),
    award: React.PropTypes.bool,
    cAndB: React.PropTypes.string,
    hm: React.PropTypes.bool,
    keywords: React.PropTypes.arrayOf(React.PropTypes.string),
    title: React.PropTypes.string
  }),
};

export default Chi2016Entity;
