import React from 'react';
import Chi2016EventsDay from './events-day.jsx';

class Chi2016Events extends React.Component {
  renderEvent() {
    const {schedule} = this.props;
    return schedule && schedule.length ? schedule.map((event, key) => {
      return (
        <Chi2016EventsDay
          event = {event}
          key = {key}
        />
      );
    }) : null;
  }
  render() {
    return (
      <div className="mdl-grid mdl-grid--no-spacing chi2016-events">
        {this.renderEvent()}
      </div>
    );
  }
}

export default Chi2016Events;
