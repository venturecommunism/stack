import React from 'react';
import classNames from 'classnames';
import Highlighter from 'react-highlight-words';
import {chiTypes} from './../../libs';

class Chi2016GlanceDaySlotSession extends React.Component {
  renderType(type) {
    const types = chiTypes();
    for (let i = 0; i < types.length; i++) {
      if (types[i].flag === type) {
        return types[i].label;
      }
    }
  }
  render() {
    const {
      session,
      id,
      handleScheduleSessionSwitch,
      query,
      slotId,
      day
    } = this.props;
    const {search, searchRegex} = query;
    if (session) {
      const onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleScheduleSessionSwitch({slot: slotId, session: id, day, query});
      };
      const {type, s_title, room, chair} = session;
      const defaultClass = classNames(
        'mdl-cell mdl-cell--3-col',
        'mdl-cell--4-col-tablet',
        'mdl-cell--2-col-phone mdl-cell--stretch',
        'chi2016-glance-day-slot-session-container'
      );
      const flag = !search || search.trim() === '' ||
        s_title.toLowerCase().trim().match(searchRegex) ||
        chair.toLowerCase().trim().match(searchRegex);
      const className = !flag ? classNames(defaultClass, 'chi2016-hidden') : defaultClass;
      const searchWords = search && search.trim() !== '' ?
        search.split(/\s/).filter(word => word) : [];
      return (
        <div
          className={className}
          onClick = {onClick}
        >
          <div
            className="mdl-grid mdl-grid--no-spacing chi2016-glance-day-slot-session"
            id={`glance-${id}`}
          >
            <div className="mdl-cell mdl-cell--12-col
              chi2016-glance-day-slot-session-type"
            >
              {this.renderType(type)}
            </div>
            <div
              className="mdl-cell mdl-cell--12-col mld-cell--stretch mdl-cell--bottom
              chi2016-glance-day-slot-session-room"
            >
              {`Room: ${room}`}
            </div>
            <div
              className="mdl-cell mdl-cell--12-col
              chi2016-glance-day-slot-session-title"
            >
              <Highlighter
                highlightClassName="highlight"
                searchWords={searchWords}
                textToHighlight={s_title.replace('&amp;', '&').replace('&nbsp;', ' ')}
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Chi2016GlanceDaySlotSession;
