import React from 'react';
import classNames from 'classnames';

class Chi2016Slot extends React.Component {
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
  renderSessions() {
    const {slot, sessionRenderer} = this.props;
    const {sessions, slot_class} = slot;
    return sessions.map((session, key) => {
      return sessionRenderer(session.session, slot_class, key);
    });
  }
  render() {
    const {slot} = this.props;
    const className = classNames(
      'mdl-grid mdl-grid--no-spacing',
      'chi2016-slot',
      `chi2016-${slot.slot_class}`
    );
    return (
      <div className="mdl-cell mdl-cell--12-col chi2016-slot-group">
        <div className={className}>
          <div
            className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet
              mdl-cell--2-col-phone chi2016-time-container chi2016-slot-containers"
            id={slot.slot_id}
          >
            <h2 className="chi2016-time">
              {slot.time}
            </h2>
          </div>
          {this.renderSessions()}
        </div>
      </div>
    );
  }
}

Chi2016Slot.propTypes = {
  sessionRenderer: React.PropTypes.func,
  sessions: React.PropTypes.arrayOf(React.PropTypes.shape({
    room: React.PropTypes.string,
    session: React.PropTypes.string
  })),
  slot_class: React.PropTypes.string,
  slot_id: React.PropTypes.string,
  time: React.PropTypes.string
};

Chi2016Slot.defaultProps = {
  sessionRenderer: () => null,
  sessions: [],
  slot_class: '',
  slot_id: '',
  time: ''
};

export default Chi2016Slot;
