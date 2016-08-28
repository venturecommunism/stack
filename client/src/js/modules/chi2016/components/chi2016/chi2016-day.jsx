import React from 'react';
import Chi2016Slot from './chi2016-slot.jsx';

class Chi2016Day extends React.Component {
  componentDidMount() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
  }
  componentDidUpdate() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
  }
  renderSlots() {
    const {day, sessionRenderer} = this.props;
    const {slots} = day;
    return slots.map((slot, key) => {
      return (
        <Chi2016Slot
          key = {key}
          sessionRenderer = {sessionRenderer}
          slot = {slot}
        />
      );
    });
  }
  render() {
    const {day} = this.props;
    return (
      <div className="chi2016-day mdl-grid--no-spacing">
        <div className="mdl-cell mdl-cell--12-col chi2016-day-date-container">
          <h1 className="chi2016-day-date">
            {day.date} - {day.day}
          </h1>
        </div>
        {this.renderSlots()}
      </div>
    );
  }
}

Chi2016Day.propTypes = {
  day: React.PropTypes.shape({
    date: React.PropTypes.string,
    day: React.PropTypes.string,
    slots: React.PropTypes.array
  }),
  sessionRenderer: React.PropTypes.func,
};

Chi2016Day.defaultProps = {
  day: {
    date: '',
    day: '',
    slots: []
  },
  sessionRenderer: () => null
};

export default Chi2016Day;
