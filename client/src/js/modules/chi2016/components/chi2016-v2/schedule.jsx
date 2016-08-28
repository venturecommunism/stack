import React from 'react';
import Chi2016ScheduleDay from './schedule-day.jsx';
import zenscroll from 'zenscroll';
import {debounce} from './../../libs';
const offset = 444;

class Chi2016Schedule extends React.Component {
  componentDidMount() {
    this.scrollToTime();
    this.changeDayNav();
    window.onresize = this.changeDayNav.bind(this);
  }
  componentDidUpdate() {
    this.scrollToTime(true);
  }
  componentWillUnmount() {
    window.onresize = null;
  }
  scrollToTime(flag) {
    const {query} = this.props;
    const {slot, day, session} = query;
    const time = 500;
    const main = document.getElementById('chi2016-main-content');
    const scroller = zenscroll.createScroller(main, 500);
    const offsetScroll = window.innerWidth >= 480 ? 10 : 51;
    const dayNav = this.dayNav;
    clearInterval(this.scrollerId);
    if (session) {
      const target = document.getElementById(`${session}-schedule-day-session`);
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
      const target = document.getElementById(`${day}-schedule-day-group`);
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
    const changeDayNav = this.changeDayNav.bind(this);
    main.addEventListener('scroll', changeDayNav);
  }
  changeDayNav() {
    const dayNav = this.dayNav;
    const main = document.getElementById('chi2016-main-content');
    if (dayNav) {
      if (main.scrollTop > 410) {
        dayNav.style.position = 'fixed';
        dayNav.style.top = '0px';
        dayNav.style.left = '0px';
        dayNav.style.zIndex = 1;
        if (window.innerWidth > 1000) {
          dayNav.style.width = '20%';
        } else if (window.innerWidth >= 480) {
          dayNav.style.width = '24%';
        } else {
          dayNav.style.width = '100%';
        }
      } else {
        dayNav.style.position = '';
        dayNav.style.top = '';
        dayNav.style.zIndex = '';
        dayNav.style.width = '100%';
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
  renderNav() {
    const {schedule, handleScheduleSessionSwitch, query} = this.props;
    return schedule && schedule.length ? schedule.map((sDay, key) => {
      const {day} = sDay;
      const onHandleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleScheduleSessionSwitch({day, query, showAll: true});
      };

      return (
        <div
          className="mdl-cell mdl-cell--12-col mdl-cell--1-col-phone
            chi2016-schedule-nav"
          onClick={onHandleClick}
        >
          {day}
        </div>
      );
    }) : null;
  }
  render() {
    const navRef = (c) => {
      this.dayNav = c;
    };
    return (
      <div className="mdl-grid mdl-grid--no-spacing chi2016-schedule">
        <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet
          mdl-cell--4-col-phone chi2016-schedule-nav-group"
        >
          <div
            className="mdl-grid mdl-grid--no-spacing chi2016-schedule-nav-bar"
            ref={navRef}
          >
            {this.renderNav()}
          </div>
        </div>
        <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet
          mdl-cell--4-col-phone chi2016-schedule-day-container"
        >
          {this.renderDay()}
        </div>
      </div>
    );
  }
}

export default Chi2016Schedule;
