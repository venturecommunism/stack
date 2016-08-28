import React from 'react';
import MdlDialog from './../organisms/mdl-dialog.jsx';
import classNames from 'classnames';

class Chi2016SessionDialog extends React.Component {
  constructor() {
    super();
    this.renderDialog = this.renderDialog.bind(this);
    this.actionButtons = this.actionButtons.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
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
  closeDialog() {
    this.dialog.closeDialog();
  }
  actionButtons() {
    return [
      {
        onCallback: this.closeDialog,
        label: 'Close'
      }
    ];
  }
  renderValue(title, val) {
    return !val || val.trim() === '' ? null : (
      <div className="mdl-cell mdl-cell--12-col">
        <span className="session-value-key">{title}</span>{': '}
        <span className="session-value">{val}</span>
      </div>
    );
  }
  renderEntities() {
    const {entity, session} = this.props;

    if (session.submissions) {
      return session.submissions.map((id, key) => {
        return (
          <div
            className="mdl-cell mdl-cell--12-col"
            key = {key}
          >
            {React.createElement(entity, {
              displayName: 'entity',
              id
            })}
          </div>
        );
      });
    }
  }
  renderDialog() {
    const {session, classList} = this.props;

    const className = classNames(
      'chi2016-session-dialog-content',
      'mdl-grid',
      classList.map((name) => (`${name}-chi2016-session-dialog-content`))
    );

    return (
      <div className={className}>
        <div className="mdl-cell mdl-cell--12-col">
          <div className="mdl-grid mdl-grid--no-spacing">
            {this.renderValue('Chair', session.chair)}
            {this.renderValue('Day', session.day)}
            {this.renderValue('Time', session.time)}
            {this.renderValue('Room', session.room)}
          </div>
        </div>
        {this.renderEntities()}
      </div>
    );
  }
  render() {
    const {session, classList} = this.props;
    const newClassList = [
      ...classList,
      'chi2016-session'
    ];
    const {s_title} = session;

    const dialog = (c) => {
      this.dialog = c;
    };

    return (
      <MdlDialog
        actions = {this.actionButtons()}
        classList = {newClassList}
        content = {this.renderDialog}
        ref = {dialog}
        title = {s_title.replace('&amp;', '&')}
      />
    );
  }
}

Chi2016SessionDialog.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  entity: React.PropTypes.func,
  id: React.PropTypes.string,
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

Chi2016SessionDialog.defaultProps = {
  classList: [],
  id: '',
  session: {
    hasAward: false,
    hasHonorableMention: false,
    room: '',
    s_title: ''
  }
};

export default Chi2016SessionDialog;
