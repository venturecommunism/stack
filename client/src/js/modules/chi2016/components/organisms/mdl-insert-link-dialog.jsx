import React from 'react';
import MdlDialog from './../organisms/mdl-dialog.jsx';
import MdlInputText from './../atoms/mdl-input-text.jsx';
import classNames from 'classnames';

class MdlInsertLinkDialog extends React.Component {
  constructor() {
    super();
    this.renderDialog = this.renderDialog.bind(this);
    this.actionButtons = this.actionButtons.bind(this);
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
    const {onCallback} = this.props;
    return [
      {
        onCallback: () => {
          this.dialog.closeDialog();
          if (this.link && this.link.getValue) onCallback(this.link.getValue());
        },
        label: 'Insert'
      },
      {
        onCallback: () => {
          this.dialog.closeDialog();
          this.link.setValue('');
        },
        label: 'Cancel'
      }
    ];
  }
  renderDialog() {
    const {id, classList} = this.props;

    const link = (c) => {
      this.link = c;
    };

    const className = classNames(
      'react-mdl-insert-link-dialog-content',
      classList.map((name) => (`${name}-react-mdl-insert-link-dialog-content`))
    );

    return (
      <div className={className}>
        <MdlInputText
          id={`${id}-react-mdl-insert-link-dialog-input`}
          label="Type Link here"
          ref={link}
        />
      </div>
    );
  }
  render() {
    const {classList} = this.props;

    const dialog = (c) => {
      this.dialog = c;
    };

    return (
      <MdlDialog
        actions = {this.actionButtons()}
        classList = {classList}
        content = {this.renderDialog}
        ref = {dialog}
        title = "Insert Link"
      />
    );
  }
}

MdlInsertLinkDialog.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  id: React.PropTypes.string,
  onCallback: React.PropTypes.func
};

MdlInsertLinkDialog.defaultProps = {
  classList: [],
  id: 'mdl-insert-link-dialog',
  onCallback: () => null,
};

export default MdlInsertLinkDialog;
