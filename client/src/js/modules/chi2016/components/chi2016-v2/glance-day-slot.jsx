import React from 'react';
import classNames from 'classnames';
import Chi2016GlanceDaySlotSession from './../../containers/v2/glance-day-slot-session';
import Chi2016GlanceDaySlotSessionSimplified from './../../containers/v2/glance-day-slot-session-simplified';
import qs from 'qs';

class Chi2016GlanceDaySlot extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.query.search !== this.props.query.search;
  }
  renderTitle() {
    const {slot, query, day} = this.props;
    const {slot_id, sessions, slot_class, title} = slot;
    const q = qs.stringify(Object.assign({}, query, {
      tab: 'chi2016-schedule',
      slot: slot_id,
      day
    }));
    if (slot_class === 'break') {
      return sessions && sessions.length ? sessions.map((session, key) => {
        return (
          <Chi2016GlanceDaySlotSessionSimplified
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
    return (
      <div className="mdl-grid mdl-grid--no-spacing">
        <div
          className="mdl-cell mdl-cell--12-col
            chi2016-glance-day-slot-title-container"
        >
          <a
            href={`?${q}`}
            className="chi2016-glance-day-slot-title"
          >
            {title}
          </a>
        </div>
      </div>
    );
  }
  renderSessionGroup() {
    return (
      <div className="mdl-grid mdl-grid--no-spacing
        chi2016-glance-day-slot-session-group"
      >
        {this.renderSessions()}
      </div>
    );
  }
  renderSessions() {
    const {slot, query, day} = this.props;
    const {sessions, slot_class, slot_id} = slot;
    return sessions && sessions.length ? sessions.map((session, key) => {
      return (
        <Chi2016GlanceDaySlotSession
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
  render() {
    const {slot, query, day, handleScheduleSessionSwitch} = this.props;
    const {slotId} = query;
    const {time, slot_class, slot_id} = slot;
    const defaultClass = 'mdl-cell mdl-cell--12-col chi2016-glance-day-slot';
    const className = slotId === slot_id ? classNames(
      defaultClass,
      slot_class,
      'chi2016-glance-day-slot-highlight'
    ) : classNames(defaultClass, slot_class);
    const q = qs.stringify(Object.assign({}, query, {
      tab: 'chi2016-schedule',
      slot: slot_id,
      day
    }));
    const onHandleClick = (e) => {
      if (slot_class === 'plenary' || slot_class === 'end' | slot_class === 'break') {
        e.preventDefault();
        e.stopPropagation();
        handleScheduleSessionSwitch({day, slot: slot_id});
      }
    };
    return (
      <div
        className={className}
        id={`${slot_id}-glance-day-slot`}
        onClick={onHandleClick}
      >
        <div className="mdl-grid mdl-grid--no-spacing">
          <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet
            mdl-cell--4-col-phone mdl-cell--top chi2016-glance-day-slot-time"
          >
            <a
              href={`?${q}`}
              className="chi2016-glance-day-slot-time-anchor"
            >
              <div className="chi2016-glance-day-slot-time-text">
                {time}
              </div>
            </a>
          </div>
          <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet
            mdl-cell--4-col-phone mdl-cell--top chi2016-glance-day-slot-group"
          >
            {
              slot_class === 'plenary' ||
              slot_class === 'break' ||
              slot_class === 'end' ?
              this.renderTitle() : this.renderSessionGroup()
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Chi2016GlanceDaySlot;
