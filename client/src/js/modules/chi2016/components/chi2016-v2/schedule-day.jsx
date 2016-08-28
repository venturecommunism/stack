import React from 'react';
import qs from 'qs';
import Chi2016ScheduleDaySession from './../../containers/v2/schedule-day-session';

class Chi2016ScheduleDay extends React.Component {
  componentDidMount() {
    if (componentHandler) {
      componentHandler.upgradeDom('MaterialTooltip', 'mdl-tooltip');
    }
  }
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
  renderChangeTimeButton(slots, schedule, index, dayIndex, up, onHandleClick) {
    const flag = !up ? index < slots.length - 1 || dayIndex < schedule.length - 1 :
      index > 0 || dayIndex > 0;
    const arrow = `arrow_${up ? 'upward' : 'downward'}`;
    const label = up ? 'Go back up to previous time slot' :
      'Go down to next time slot';
    return flag ? (
      <span>
        <button
          className="mdl-button mdl-js-button mdl-button--icon
            chi2016-schedule-change-time"
          onClick={onHandleClick}
          id={`${slots[index].slot_id}-${arrow}`}
        >
          <i className="material-icons">{arrow}</i>
        </button>
        <div
          className="mdl-tooltip"
          htmlFor={`${slots[index].slot_id}-${arrow}`}
        >
          {label}
        </div>
      </span>
    ) : null;

  }
  renderSlots() {
    const {
      day,
      query,
      slots,
      handleScheduleSessionSwitch,
      dayIndex,
      schedule,
    } = this.props;
    const {tab} = query;
    return slots && slots.length ? slots.map((slotObj, key) => {
      const {slot_id, time, slot_class, sessions} = slotObj;
      const goBack = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (key > 0 || dayIndex > 0) {
          const lastDay = schedule[dayIndex - 1];
          const newSlot = key === 0 ? lastDay.slots[lastDay.slots.length - 1].slot_id :
            slots[key - 1].slot_id;
          handleScheduleSessionSwitch({day, query, slot: newSlot});
        }
      };
      const goForward = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (key < slots.length - 1 || dayIndex < schedule.length - 1) {
          const nextDay = schedule[dayIndex + 1];
          const newSlot = key === slots.length - 1 ?
            nextDay.slots[0].slot_id :
            slots[key + 1].slot_id;
          handleScheduleSessionSwitch({day, query, slot: newSlot});
        }
      };
      const href = qs.stringify({
        slot: slot_id,
        day,
        tab
      });
      return (
        <div className="mdl-cell mdl-cell--12-col chi2016-schedule-day">
          <div
            className="mdl-grid mdl-grid--no-spacing"
            id={slot_id}
          >
            <div className="mdl-cell mdl-cell--12-col chi2016-schedule-day-text-group">
              <div className="mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell mdl-cell--5-col chi2016-schedule-day-text">
                  <a
                    className="chi2016-schedule-day-text-anchor"
                    href={`?${href}`}
                  >
                    <h1>{`${day}, ${time} `}</h1>
                  </a>
                  {this.renderChangeTimeButton(slots, schedule, key, dayIndex, true, goBack)}
                  {this.renderChangeTimeButton(slots, schedule, key, dayIndex, false, goForward)}
                </div>
              </div>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--12-col chi2016-schedule-day-slots">
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
        className="mdl-grid mdl-grid--no-spacing chi2016-schedule-day-group"
        id = {`${day}-schedule-day-group`}
      >
        {this.renderSlots()}
      </div>
    );
  }
}

export default Chi2016ScheduleDay;
