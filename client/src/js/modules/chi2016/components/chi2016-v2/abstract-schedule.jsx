import React from 'react';
import Chi2016ScheduleDay from './abstract-schedule-day.jsx';
import zenscroll from 'zenscroll';
import {debounce} from './../../libs';
const offset = 444;

class Chi2016AbstractSchedule extends React.Component {
  componentDidMount() {
    this.scrollToTime();
  }
  scrollToTime(flag) {
    const {query} = this.props;
    const {slot, day, session, entity} = query;
    const time = 500;
    const main = document.getElementById('chi2016-main-content');
    const scroller = zenscroll.createScroller(main, 500);
    const offsetScroll = window.innerWidth >= 480 ? 10 : 51;
    clearInterval(this.scrollerId);
    console.log(entity)
    if (entity) {
      let entityCounter = 0;
      let entityInterval = setInterval(() => {
        const target = document.getElementById(`${entity}-abstract-schedule-day-session-entity`);
        if (target) {
          clearInterval(entityInterval);
          const scrollNow = () => {
            scroller.toY(main.scrollTop + target.getBoundingClientRect().top - offsetScroll);
            let diff = target.getBoundingClientRect().top - offsetScroll;
            if (diff === 0 || Math.abs(diff) < 5) {
              clearInterval(this.scrollerId);
            } else {
              console.log(diff)
            }
          };
          scrollNow();
          this.scrollerId = setInterval(scrollNow, time);
        } else if (entityCounter >= 60) {
          clearInterval(entityInterval);
        }
        entityCounter++;
      }, 500);

    }
    else if (session) {
      const target = document.getElementById(`${session}-abstract-schedule-day-session`);
      if (target) {
        const scrollNow = () => {
          scroller.toY(main.scrollTop + target.getBoundingClientRect().top - offsetScroll);
          let diff = target.getBoundingClientRect().top - offsetScroll;
          if (diff === 0 || Math.abs(diff) < 5) {
            clearInterval(this.scrollerId);
          } else {
            console.log(diff)
          }
        };
        scrollNow();
        this.scrollerId = setInterval(scrollNow, time);
      }
    } else if (slot) {
      const target = document.getElementById(slot);
      if (target) {
        const scrollNow = () => {
          scroller.toY(main.scrollTop + target.getBoundingClientRect().top - offsetScroll);
          let diff = target.getBoundingClientRect().top - offsetScroll;
          if (diff === 0 || Math.abs(diff) < 5) {
            clearInterval(this.scrollerId);
          } else {
            console.log(diff)
          }
        };
        scrollNow();
        this.scrollerId = setInterval(scrollNow, time);
      }
    } else if (day) {
      const target = document.getElementById(`${day}-abstract-schedule-day-group`);
      if (target) {
        const scrollNow = () => {
          scroller.toY(main.scrollTop + target.getBoundingClientRect().top - offsetScroll);
          let diff = target.getBoundingClientRect().top - offsetScroll;
          if (diff === 0 || Math.abs(diff) < 5) {
            clearInterval(this.scrollerId);
          } else {
            console.log(diff)
          }
        };
        scrollNow();
        this.scrollerId = setInterval(scrollNow, time);
      }
    }
  }
  renderDay() {
    const {schedule, query, handleScheduleSessionSwitch} = this.props;
    if (schedule && schedule.length) {
      return schedule.map((dayObj, key) => {
        const {slots, day, date} = dayObj;
        return (
          <Chi2016ScheduleDay
            query = {query}
            slots = {slots}
            day = {day}
            date = {date}
            schedule = {schedule}
            dayIndex = {key}
            handleScheduleSessionSwitch = {handleScheduleSessionSwitch}
          />
        );
      });
    }
    return null;
  }
  render() {
    const navRef = (c) => {
      this.dayNav = c;
    };
    return (
      <div className="mdl-grid mdl-grid--no-spacing chi2016-abstract-schedule">
        <div className="mdl-cell mdl-cell--12-col chi2016-abstract-schedule-day-container"
        >
          {this.renderDay()}
        </div>
      </div>
    );
  }
}

export default Chi2016AbstractSchedule;
