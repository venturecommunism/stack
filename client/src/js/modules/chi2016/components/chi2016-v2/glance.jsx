import React from 'react';
import Chi2016GlanceDay from './glance-day.jsx';
import zenscroll from 'zenscroll';
import _ from 'underscore';

class Chi2016Glance extends React.Component {
  componentDidMount() {
    this.runScroller();
  }
  componentDidUpdate() {
    this.runScroller(true);
  }
  shouldComponentUpdate(nextProps) {
    return this.props.query.slot !== nextProps.query.slot ||
      this.props.query.day !== nextProps.query.day ||
      this.props.query.search !== nextProps.query.search ||
      !_.isEqual(nextProps.schedule, this.props.schedule);
  }
  runScroller(update) {
    const {query} = this.props;
    const {slot, day} = query;
    const main = document.getElementById('chi2016-main-content');
    const newTime = update ? 100 : 1000;
    clearTimeout(this.scrollerId);
    if (slot) {
      this.scrollerId = setTimeout(() => {
        // console.log('scroller');
        clearTimeout(this.scrollerId);
        const target = document.getElementById(`${slot}-glance-day-slot`);
        const scroller = zenscroll.createScroller(main, 1000);
        scroller.toY(main.scrollTop + target.getBoundingClientRect().top);
      }, newTime);
    } else if (!slot && day) {
      this.scrollerId = setTimeout(() => {
        // console.log('scroller 2');
        clearTimeout(this.scrollerId);
        const scroller = zenscroll.createScroller(main, 1000);
        const target = document.getElementById(`${day}-glance-day`);
        scroller.toY(main.scrollTop + target.getBoundingClientRect().top);
      }, newTime);
    }
  }
  renderDay() {
    const {
      schedule,
      searchTypes,
      flags,
      query,
      handleScheduleSessionSwitch
    } = this.props;
    return schedule && schedule.length ? schedule.map((day, key) => {
      return (
        <Chi2016GlanceDay
          dayObj = {day}
          key = {key}
          searchTypes = {searchTypes}
          flags = {flags}
          query = {query}
          schedule = {schedule}
          index = {key}
          handleScheduleSessionSwitch = {handleScheduleSessionSwitch}
        />
      );
    }) : null;
  }
  render() {
    return (
      <div className="mdl-grid mdl-grid--no-spacing chi2016-glance">
        {this.renderDay()}
      </div>
    );
  }
}

export default Chi2016Glance;
