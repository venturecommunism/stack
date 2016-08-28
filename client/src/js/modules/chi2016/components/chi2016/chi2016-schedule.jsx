import React from 'react';
import Chi2016Day from './chi2016-day.jsx';

class Chi2016Schedule extends React.Component {
  componentDidMount() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
    const {handleSchedule} = this.props;
    handleSchedule();
    console.info('Schedule mounted');
  }
  componentDidUpdate() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
    console.info('Schedule updated');
  }
  renderDays() {
    const {schedule, sessionRenderer} = this.props;
    return schedule.map((day, key) => {
      return (
        <div
          className="mdl-cell mdl-cell--12-col chi2016-day"
          key={key}
        >
          <Chi2016Day
            day = {day}
            sessionRenderer = {sessionRenderer}
          />
        </div>
      );
    });
  }
  render() {
    const {searchRenderer} = this.props;
    return (
      <div className="chi2016-schedule mdl-grid mdl-grid--no-spacing">
        <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset-desktop
          mdl-cell--8-col-tablet mdl-cell--4-col-phone"
        >
          
          <div className="mdl-grid">
            {this.renderDays()}
          </div>
        </div>
      </div>
    );
  }
}

Chi2016Schedule.propTypes = {
  handleSchedule: React.PropTypes.func,
  schedule: React.PropTypes.array,
  searchRenderer: React.PropTypes.func,
  sessionRenderer: React.PropTypes.func
};

Chi2016Schedule.defaultProps = {
  handleSchedule: () => null,
  schedule: [],
  searchRenderer: () => null,
  sessionRenderer: () => null,
};


export default Chi2016Schedule;
