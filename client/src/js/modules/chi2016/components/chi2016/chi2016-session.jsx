import React from 'react';
import classNames from 'classnames';
import Chi2016SessionDialog from './chi2016-session-dialog.jsx';
import {chiTypes} from './../../libs';

class Chi2016Session extends React.Component {
  constructor() {
    super();
    this.openDialog = this.openDialog.bind(this);
  }
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
  openDialog() {
    this.dialog.openDialog();
  }
  renderType(type) {
    const types = chiTypes();
    for (let i = 0; i < types.length; i++) {
      if (types[i].flag === type) {
        return `Type: ${types[i].label}`;
      }
    }
  }
  renderHonorable() {
    return (
      <img
        className = 'chi2016-honorable-icon'
        src = 'src/images/icon_1199.png'
      />
    );
  }
  renderAward() {
    return (
      <img
        className = 'chi2016-award-icon'
        src = 'src/images/icon_1198.png'
      />
    );
  }
  renderAwards(a, h) {
    if (a & h) {
      return (
        <span>
          {this.renderAward()}
          {this.renderHonorable()}
        </span>
      );
    } else if (a) {
      return this.renderAward();
    } else if (h) {
      return this.renderHonorable();
    }
  }
  render() {
    const {session, entity, id} = this.props;
    if (session) {
      const {subtype, type, s_title, room, hasAward, hasHonorableMention} = session;
      const className = classNames(
        'mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet',
        'mdl-cell--2-col-phone chi2016-session-container',
        'chi2016-slot-containers',
        `chi2016-subtype-${subtype}`,
        `chi2016-type-${type}`
      );
      const dialogRef = (c) => {
        this.dialog = c;
      };
      return (
        <div
          className={className}
          id = {id}
        >
          <div
            className="mdl-grid chi2016-slot-clickable"
            onClick = {this.openDialog}
          >
            <div className="mdl-cell mdl-cell--12-col">
              <span className="chi2016-session-title">
                {this.renderAwards(hasAward, hasHonorableMention)}
                {s_title.replace('&amp;', '&').replace('&nbsp;', ' ')}
              </span>
            </div>
            <div className="mdl-cell mdl-cell--12-col chi2016-session-type-container">
              <span className="chi2016-session-type">
                {this.renderType(type)}
              </span>
            </div>
            <div className="mdl-cell mdl-cell--12-col chi2016-session-room-container">
              <span className="chi2016-session-room">
                {room ? 'Room: ' : ''}{room}
              </span>
            </div>
          </div>
          <Chi2016SessionDialog
            id = {`${id}-dialog`}
            session = {session}
            entity = {entity}
            ref = {dialogRef}
          />
        </div>
      );
    }
    return null;
  }
}

Chi2016Session.propTypes = {
  id: React.PropTypes.string,
  entity: React.PropTypes.func,
  session: React.PropTypes.shape({
    chair: React.PropTypes.string,
    day: React.PropTypes.string,
    hasAward: React.PropTypes.bool,
    hasHonorableMention: React.PropTypes.bool,
    personas: React.PropTypes.string,
    room: React.PropTypes.string,
    s_title: React.PropTypes.string,
    submissions: React.PropTypes.arrayOf(React.PropTypes.string),
    subtype: React.PropTypes.string,
    time: React.PropTypes.string,
    type: React.PropTypes.string,
    venue: React.PropTypes.string
  })
};

Chi2016Session.defaultProps = {
  id: '',
  session: {
    hasAward: false,
    hasHonorableMention: false,
    room: '',
    s_title: ''
  }
};

export default Chi2016Session;
