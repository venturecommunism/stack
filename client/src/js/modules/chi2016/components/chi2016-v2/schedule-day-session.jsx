import React from 'react';
import classNames from 'classnames';
import Chi2016ScheduleDaySessionEntity from './../../containers/v2/schedule-day-session-entity';
import {chiTypes} from './../../libs';
import qs from 'qs';
import _ from 'underscore';

class Chi2016ScheduleDaySession extends React.Component {
  constructor() {
    super();
    this.renderHidden = this.renderHidden.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.session, nextProps.session) ||
      this.props.query.search !== nextProps.query.search;
  }
  renderHidden() {
    const {query, session} = this.props;
    const {search} = query;
    if (this.entityArea && search && search.trim() !== '') {
      const container = this.entityArea.childNodes;
      let flag = true;

      for (let i = 0; i < container.length; i++) {
        if (container[i].className.indexOf('chi2016-hidden') < 0) {
          flag = false;
          break;
        }
      }
      if (flag) {
        if (this.sessionArea.className.indexOf('chi2016-hidden') < 0) {
          this.sessionArea.className = classNames(this.sessionArea.className, 'chi2016-hidden');
        }
      } else {
        console.log(session);
        const className = this.sessionArea.className;
        this.sessionArea.className = className.replace('chi2016-hidden', '');
      }
    } else {
      // console.log(this.props);
    }
  }
  renderType(type) {
    const types = chiTypes();
    for (let i = 0; i < types.length; i++) {
      if (types[i].flag === type) {
        return `${types[i].label}: `;
      }
    }
    return '';
  }
  renderEntities(submissions) {
    const {query, className, session} = this.props;
    const onHidden = this.renderHidden;
    return submissions && submissions.length ? submissions.map((entity, key) => {
      return (
        <Chi2016ScheduleDaySessionEntity
          id = {entity}
          className = {className}
          key = {key}
          query = {query}
          hiddenCallback = {onHidden}
          session = {session}
        />
      );
    }) : null;
  }
  renderChair(chair) {
    return chair ? (
      <div className="mdl-grid mdl-grid--no-spacing chi2016-schedule-day-session-chair">
        <div className="mdl-cell mdl-cell--10-col mdl-cell--2-offset
          mdl-cell--6-col-tablet mdl-cell--2-offset-tablet mdl-cell--3-col-phone
          mdl-cell--1-offset-phone"
        >
          <h4>
            {`Chair: ${chair}`}
          </h4>
        </div>
      </div>
    ) : null;
  }
  render() {
    const {session, id, handleScheduleSessionSwitch, slotId, day, query} = this.props;
    if (session) {
      const {type, s_title, room, chair, submissions} = session;
      const titleClassName = classNames(
        'mdl-cell mdl-cell--12-col',
        'chi2016-schedule-day-session-title',
        type
      );

      const entityRef = (c) => {
        this.entityArea = c;
      };
      const sessionRef = (c) => {
        this.sessionArea = c;
      };
      // console.log(s_title);
      // console.log(day)
      const onClickEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (id === 'lunchchi0') {
          window.open('https://chi2016.acm.org/wp/lunch-at-chi/', '_blank');
        } else if (id === 'diversitylunch1') {
          window.open('https://chi2016.acm.org/wp/diversity-and-inclusion-lunch/', '_blank');
        } else if (session.type === 'intdemo') {
          window.open('https://chi2016.acm.org/wp/interactivity/', '_blank');
        } else if (id === 'workshops0' || id === 'workshops1') {
          window.open('https://chi2016.acm.org/wp/workshops/', '_blank');
        } else if (id === 'chi4good') {
          window.open('https://chi2016.acm.org/wp/day-of-service/', '_blank');
        } else if (id === 'doctoral') {
          window.open('https://chi2016.acm.org/wp/doctoral-consortium/', '_blank');
        }
        handleScheduleSessionSwitch({slot: slotId, session: id, day, query});
      };
      return (
        <div
          className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet
            mdl-cell--4-col-phone chi2016-schedule-day-session"
          ref={sessionRef}
          id={`${id}-schedule-day-session`}

        >
          <div className="mdl-grid mdl-grid--no-spacing">
            <div
              className={titleClassName}
              onClick={onClickEvent}
            >
              <h2 className="chi2016-schedule-day-session-h2">
                <div className="mdl-grid mdl-grid--no-spacing">
                  <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet
                    mdl-cell--1-col-phone chi2016-schedule-day-session-room"
                  >
                    <span className="screen-reader-text">{'Room: '}</span>{room}
                  </div>
                  <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet
                    mdl-cell--3-col-phone chi2016-schedule-day-session-title-text"
                  >
                    {`${this.renderType(type)}`}
                    {s_title.replace('&amp;', '&').replace('&nbsp;', ' ')}
                  </div>
                </div>
              </h2>
            </div>
            <div className="mdl-cell mdl-cell--12-col">
              {this.renderChair(chair)}
            </div>
            <div className="mdl-cell mdl-cell--12-col
              chi2016-schedule-day-session-entities"
              ref={entityRef}
            >
              {this.renderEntities(submissions)}
            </div>
          </div>

        </div>
      );
    }
    return null;
  }
}

export default Chi2016ScheduleDaySession;
