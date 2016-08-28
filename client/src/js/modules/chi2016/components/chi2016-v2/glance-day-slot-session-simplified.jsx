import React from 'react';
import qs from 'qs';

class Chi2016GlanceDaySlotSessionSimplified extends React.Component {
  render() {
    const {session, slotId, query, day} = this.props;
    const {s_title} = session;
    const q = qs.stringify(Object.assign({}, query, {
      tab: 'chi2016-schedule',
      slot: slotId,
      day
    }));
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
            {s_title}
          </a>
        </div>
      </div>
    );
  }
}

export default Chi2016GlanceDaySlotSessionSimplified;
