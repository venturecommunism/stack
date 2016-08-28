import React from 'react';
import Chi2016GlanceDaySlot from './glance-day-slot.jsx';
import qs from 'qs';
import _ from 'underscore';

class Chi2016GlanceDay extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.query.search !== this.props.query.search ||
      !_.isEqual(nextProps.dayObj, this.props.dayObj);
  }
  renderSlots() {
    const {
      dayObj,
      flags,
      searchTypes,
      query,
      handleScheduleSessionSwitch
    } = this.props;
    const {slots, day} = dayObj;
    return slots && slots.length ? slots.map((slot, key) => {
      return (
        <Chi2016GlanceDaySlot
          slot = {slot}
          key = {key}
          flags = {flags}
          searchTypes = {searchTypes}
          query = {query}
          day = {day}
          handleScheduleSessionSwitch = {handleScheduleSessionSwitch}
        />
      );
    }) : null;
  }
  render() {
    const {dayObj, query, index, schedule, handleScheduleSessionSwitch} = this.props;
    const {tab} = query;
    const {day, date} = dayObj;
    const href = qs.stringify(Object.assign({}, query, {
      tab: 'chi2016-schedule',
      day
    }));
    const pressDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (index <= schedule.length - 2) {
        handleScheduleSessionSwitch({day: schedule[index + 1].day, query, tab});
      }
    };
    const pressUp = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (index > 0) {
        handleScheduleSessionSwitch({day: schedule[index - 1].day, query, tab});
      }
    };
    return (
      <div
        className="mdl-cell mdl-cell--12-col chi2016-glance-day"
        id={`${day}-glance-day`}
      >
        <div className="mdl-grid mdl-grid--no-spacing">
          <div className="mdl-cell mdl-cell--12-col chi2016-glance-day-text-container">
            <div className="mdl-grid mdl-grid--no-spacing">
              <div className="mdl-cell mdl-cell--10-col mdl-cell--2-offset-desktop
                mdl-cell--6-col-tablet mdl-cell--2-offset-tablet
                mdl-cell--4-col-phone mdl-cell--top chi2016-glance-day-text"
              >
                <button
                  className="mdl-button mdl-js-button mdl-button--icon"
                  onClick={pressUp}
                >
                  <i className="material-icons">arrow_drop_up</i>
                </button>
                <a
                  href={`?${href}`}
                  className="chi2016-glance-day-text-anchor"
                >
                  {`${day}, ${date}`}
                </a>
                <button
                  className="mdl-button mdl-js-button mdl-button--icon"
                  onClick={pressDown}
                >
                  <i className="material-icons">arrow_drop_down</i>
                </button>
              </div>
            </div>
          </div>

          {this.renderSlots()}
        </div>
      </div>
    );
  }
}

export default Chi2016GlanceDay;
