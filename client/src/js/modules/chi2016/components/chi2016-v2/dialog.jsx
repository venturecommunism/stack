import React from 'react';
import dialogPolyfill from 'dialog-polyfill';
import classNames from 'classnames';

class Chi2016Dialog extends React.Component {
  constructor() {
    super();
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.title = '';
    this.content = () => null;
  }
  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      if (this.dialog && this.dialog.close && event.keyCode === 27) {
        // close the dialog
        this.dialog.close();
        if (this.dialog.className.indexOf('chi2016-hidden') < 0) {
          this.dialog.className = classNames(this.dialog.className, 'chi2016-hidden');
        }
      }
    }, true);
  }
  setContent(title, content) {
    this.title = title;
    this.content = content;
    this.forceUpdate();
  }
  openDialog(title, content) {
    if (this.dialog.showModal) {
      this.setContent(title, content);
      this.dialog.showModal();
      this.dialog.scrollTop = 0;
    }
    const className = this.dialog.className;
    this.dialog.className = className.replace('chi2016-hidden', '');
    this.dialog.focus();
  }
  closeDialog() {
    if (this.dialog.close) {

      // const event = new MouseEvent('click');
      // console.log(document.getElementById('chi2016-main-content').dispatchEvent(event))
      this.dialog.close();

      // document.getElementById('chi2016-main-content').focus()
      // console.log('focus')
    }
    if (this.dialog.className.indexOf('chi2016-hidden') < 0) {
      this.dialog.className = classNames(this.dialog.className, 'chi2016-hidden');
    }

  }
  render() {
    const {registerDialog} = this.props;

    const dialog = (c) => {
      this.dialog = c;
      if (dialogPolyfill && this.dialog && !this.dialog.showModal) {
        console.log('register dialog');
        dialogPolyfill.registerDialog(this.dialog);
      }
      registerDialog(this);
    };

    return (
      <dialog
        className="mdl-dialog chi2016-dialog chi2016-hidden"
        ref={dialog}
        role="dialog"
        aria-label={this.title}
        tabIndex = "-1"
      >
        <div className="mdl-dialog__title chi2016-dialog-title">
          <h3>
            {this.title}
          </h3>
          <button
            className="mdl-button mdl-js-button mdl-button--icon
              chi2016-dialog-close"
            onClick={this.closeDialog}
            id="chi2016-dialog-close"
          >
            <i className="material-icons">close</i>
          </button>
          <div
            className="mdl-tooltip"
            htmlFor="chi2016-dialog-close"
          >
            {'Close'}
          </div>
        </div>
        <div className="mdl-dialog__content chi2016-dialog-content">
          {this.content()}
        </div>
        <div className="mdl-dialog__actions chi2016-dialog-actions">
          <button
            className="mdl-button chi2016-dialog-button"
            onClick={this.closeDialog}
            type="button"
          >
            {'Close'}
          </button>
        </div>
      </dialog>
    );
  }
}

export default Chi2016Dialog;
