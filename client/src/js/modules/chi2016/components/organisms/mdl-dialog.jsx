import React from 'react';
import classNames from 'classnames';
import dialogPolyfill from 'dialog-polyfill';

class MdlDialog extends React.Component {
  constructor() {
    super();
    this.openDialog = this.openDialog.bind(this);
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
    if (this.dialog.showModal) {
      this.dialog.showModal();
      this.dialog.scrollTop = 0;
    }
  }
  closeDialog() {
    if (this.dialog.close) {
      this.dialog.close();
    }
  }
  renderActions() {
    const {actions, classList} = this.props;
    return actions.map((action, key) => {
      const {onCallback, label} = action;

      const className = classNames(
        'mdl-button',
        'react-mdl-dialog-action-button',
        classList.map((name) => (`${name}-react-mdl-dialog-action-button`))
      );

      return (
        <button
          className={className}
          key={key}
          onClick={onCallback}
          type="button"
        >
          {label}
        </button>
      );
    });
  }
  render() {
    const {content, title, classList} = this.props;

    const className = classNames(
      'mdl-dialog',
      'react-mdl-dialog',
      classList.map((name) => (`${name}-react-mdl-dialog`))
    );

    const titleClassName = classNames(
      'mdl-dialog__title',
      'react-mdl-dialog-title',
      classList.map((name) => (`${name}-react-mdl-dialog-title`))
    );

    const contentClassName = classNames(
      'mdl-dialog__content',
      'react-mdl-dialog-content',
      classList.map((name) => (`${name}-react-mdl-dialog-content`))
    );

    const actionsClassName = classNames(
      'mdl-dialog__actions',
      'react-mdl-dialog-actions',
      classList.map((name) => (`${name}-react-mdl-dialog-actions`))
    );

    const dialog = (c) => {
      this.dialog = c;
      if (dialogPolyfill && this.dialog && !this.dialog.showModal) {
        dialogPolyfill.registerDialog(this.dialog);
      }
    };

    return (
      <dialog
        className={className}
        ref={dialog}
      >
        <div className={titleClassName}>
          {title}
        </div>
        <div className={contentClassName}>
          {content()}
        </div>
        <div className={actionsClassName}>
          {this.renderActions()}
        </div>
      </dialog>
    );
  }
}

MdlDialog.propTypes = {
  actions: React.PropTypes.arrayOf(React.PropTypes.shape({
    handleCallback: React.PropTypes.func,
    classList: React.PropTypes.arrayOf(React.PropTypes.string),
    label: React.PropTypes.string,
  })),
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  content: React.PropTypes.func,
  title: React.PropTypes.string
};

MdlDialog.defaultProps = {
  actions: [],
  classList: [],
  content: () => null,
  title: ''
};

export default MdlDialog;
