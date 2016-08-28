import React from 'react';
import Chi2016ScheduleDaySession from './../../containers/v2/abstract-schedule-day-session';

class Chi2016AbstractScheduleDay extends React.Component {
  renderSessions(sessions, slot_class, slot_id, day) {
    const {query} = this.props;
    return sessions && sessions.length ? sessions.map((session, key) => {
      return (
        <Chi2016ScheduleDaySession
          sessionObj = {session}
          query = {query}
          className = {slot_class}
          slotId = {slot_id}
          key = {key}
          day = {day}
        />
      );
    }) : null;
  }
  renderSlots() {
    const {
      day,
      slots
    } = this.props;
    return slots && slots.length ? slots.map((slotObj, key) => {
      const {slot_id, time, slot_class, sessions} = slotObj;
      return (
        <div className="mdl-cell mdl-cell--12-col chi2016-abstract-schedule-day">
          <div
            className="mdl-grid mdl-grid--no-spacing"
            id={slot_id}
          >
            <div className="mdl-cell mdl-cell--12-col chi2016-abstract-schedule-day-text-group">
              <div className="mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell mdl-cell--5-col chi2016-abstract-schedule-day-text">
                  <h1>{`${day}, ${time} `}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--12-col chi2016-abstract-schedule-day-slots">
            <div className="mdl-grid mdl-grid--no-spacing">
              {this.renderSessions(sessions, slot_class, slot_id, day)}
            </div>
          </div>

        </div>
      );
    }) : null;
  }
  render() {
    const {day} = this.props;
    return (
      <div
        className="mdl-grid mdl-grid--no-spacing chi2016-abstract-schedule-day-group"
        id = {`${day}-abstract-schedule-day-group`}
      >
        {this.renderSlots()}
      </div>
    );
  }
}

export default Chi2016AbstractScheduleDay;
