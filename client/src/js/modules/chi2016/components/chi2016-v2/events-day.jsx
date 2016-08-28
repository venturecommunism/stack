import React from 'react';
import classNames from 'classnames';
import Chi2016EventsDaySession from './../../containers/v2/events-day-session';
import qs from 'qs';

class Chi2016EventsDay extends React.Component {
  renderSessions(sessions) {
    return sessions && sessions.length ? sessions.map((session, key) => {
      // console.log(session)
      return (
        <div key={key}>
          {React.createElement(Chi2016EventsDaySession, {
            sessionObj: session,
            displayName: 'EventDaySession'
          })}
        </div>
      );
    }) : null;
  }
  renderTechnical(slot_class, title, sessions) {
    if (title) {
      return !(slot_class === 'end' || slot_class === 'break') ?
        title : this.renderSessions(sessions);
    }
    return 'Technical Sessions';

  }
  renderSlot() {
    const {event} = this.props;
    if (event) {
      const {slots} = event;
      const defaultClass = 'mdl-cell mdl-cell--12-col chi2016-events-day-slot';
      return slots.map((slot, key) => {
        const {title, time, bold, slot_id, slot_class, sessions} = slot;
        const href = `?${qs.stringify({tab: 'chi2016-schedule', slot: slot_id})}`;
        const className = bold ?
          classNames(defaultClass, 'chi2016-events-day-slot-bold') :
          defaultClass;
        return (
          <div
            className={className}
            key = {key}
          >
            <div className="mdl-grid mdl-grid--no-spacing">
              <div className="mdl-cell chi2016-events-day-slot-time">
                <a
                  href={href}
                  className="chi2016-events-day-slot-link"
                >
                  {time}
                </a>
              </div>
              <div className="mdl-cell chi2016-events-day-slot-title">
                <a
                  href={href}
                  className="chi2016-events-day-slot-link"
                >
                  {this.renderTechnical(slot_class, title, sessions)}
                </a>
              </div>
            </div>
          </div>
        );
      });
    }
    return null;
  }
  render() {
    const {event} = this.props;
    const {backgroundColor, date, day} = event;
    const style = {
      backgroundColor
    };
    return (
      <div
        className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet
          mdl-cell--4-col-phone chi2016-events-day"
        style={style}
      >
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col mdl-cell--top
            chi2016-events-day-text-container"
          >
            <h1 className="chi2016-events-day-text">
              {`${day}, ${date}`}
            </h1>
          </div>
          {this.renderSlot()}
        </div>
      </div>
    );
  }
}

export default Chi2016EventsDay;
