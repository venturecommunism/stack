import React from 'react';
import Chi2016Entity from './entity.jsx';

class Chi2016EntityTab extends React.Component {
  render() {
    const {entity, query} = this.props;
    const {title} = entity;
    return (
      <div className="mdl-grid mdl-grid--no-spacing">
        <div className="mdl-cell mdl-cell--12-col chi2016-entity-tab-title">
          {title}
          <button
            className="mdl-button mdl-js-button mdl-button--icon
              chi2016-entity-tab-back"
            onClick={this.goBack}
            id="chi2016-entity-tab-back"
          >
            <i className="material-icons">close</i>
          </button>
          <div
            className="mdl-tooltip"
            htmlFor="chi2016-entity-tab-back"
          >
            {'Go Back'}
          </div>
        </div>
        <div className="mdl-cell mdl-cell--12-col chi2016-entity-tab-content">
          <Chi2016Entity
            query = {query}
            entity = {entity}
          />
        </div>
        <div className="mdl-cell mdl-cell--12-col chi2016-chi2016-entity-tab-actions">
          <button
            className="mdl-button chi2016-chi2016-entity-tab-button"
            onClick={this.goBack}
            type="button"
          >
            {'Go Back'}
          </button>
        </div>
      </div>
    );
  }
}

export default Chi2016EntityTab;
