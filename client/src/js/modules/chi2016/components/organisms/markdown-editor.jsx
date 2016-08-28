import React from 'react';
import classNames from 'classnames';
import MdlIconButton from './../atoms/mdl-icon-button.jsx';
import MdlInsertLinkDialog from './../organisms/mdl-insert-link-dialog.jsx';
import * as textareaLib from './../../libs/textarea.js';

class MarkdownTextarea extends React.Component {
  constructor() {
    super();
    this.insertLinkCallback = this.insertLinkCallback.bind(this);
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
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
  defaultClassNames() {
    const {classList} = this.props;
    return classNames(
      'mdl-textfield',
      'mdl-js-textfield',
      'react-mdl-markdown-editor-container',
      classList.map((name) => (`${name}-react-mdl-markdown-editor-container`))
    );
  }
  getValue() {
    return this.editor.value;
  }
  setValue(value) {
    this.editor.value = value;
    this.textareaValueCheck();
  }
  textareaValueCheck() {
    if (this.editorContainer && this.editor) {
      this.editorContainer.className = this.editor.value.trim() === '' ?
        this.defaultClassNames() :
        classNames(this.editorContainer.className.split(' '), 'is-dirty');
    }
  }
  onInsertPhotoCallback(link) {
    textareaLib.insertPhoto(this.editor, link);
    this.textareaValueCheck();
  }
  onInsertLinkCallback(link) {
    textareaLib.insertLink(this.editor, link);
    this.textareaValueCheck();
  }
  optionActions(button) {
    const options = {
      bold: {
        icon: 'format_bold',
        label: 'Bold'
      },
      italics: {
        icon: 'format_italic',
        label: 'Italics'
      },
      blockquote: {
        icon: 'format_quote',
        label: 'Quotation'
      },
      preformated: {
        icon: 'code',
        label: 'Pre-formated Text'
      },
      bulletItem: {
        icon: 'format_list_bulleted',
        label: 'Create a Bullet List'
      },
      numberItem: {
        icon: 'format_list_numbered',
        label: 'Create a Numbered list'
      },
      headerText: {
        icon: 'text_fields',
        label: 'Create a Header'
      },
      insertLink: {
        onCallback: () => {this.insertLinkDialog.openDialog();},
        icon: 'insert_link',
        label: 'Insert Link'
      },
      insertPhoto: {
        onCallback: () => {this.insertPhotoDialog.openDialog();},
        icon: 'insert_photo',
        label: 'Insert Photo'
      }
    };
    if (options[button].onCallback) return options[button];
    return Object.assign({}, options[button], {
      onCallback: () => {textareaLib[button](this.editor);}
    });
  }
  renderButtons(buttons) {
    const {id} = this.props;
    return buttons.map((button, key) => {
      const option = this.optionActions(button);
      const onCallback = () => {
        option.onCallback();
        this.textareaValueCheck();
      };
      return (
        <MdlIconButton
          onCallback={onCallback}
          icon={option.icon}
          id={`${id}-${option.icon}-markdown-editor`}
          key={key}
          label={option.label}
        />
      );
    });
  }
  render() {
    const {id, label, value, options, rows, photoDialog} = this.props;
    const editorContainerClassName = this.defaultClassNames();

    const editorRef = (c) => {
      this.editor = c;
    };

    const editorContainer = (c) => {
      this.editorContainer = c;
    };

    const insertLinkRef = (c) => {
      this.insertLinkDialog = c;
    };

    const insertPhotoRef = (c) => {
      this.insertPhotoDialog = c;
    };

    const className = classNames(
      'markdown-editor',
      classList.map((name) => (`${name}-markdown-editor`))
    );

    const editorClassName = classNames(
      'mdl-textfield__input',
      'markdown-editor-textarea',
      classList.map((name) => (`${name}-markdown-editor-textarea`))
    );

    return (
      <div className={className}>
        <div className="mdl-grid mdl-grid--no-spacing">
          <div className="mdl-cell mdl-cell--12-col">
            {this.renderButtons(options)}
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <div
              className={editorContainerClassName}
              ref={editorContainer}
            >
              <textarea
                className={editorClassName}
                defaultValue={value}
                id={`${id}-markdown-editor-textarea`}
                ref={editorRef}
                rows={rows}
                type="text"
              >
              </textarea>
              <label
                className="mdl-textfield__label"
                htmlFor={`${id}-markdown-editor-textarea`}
              >
                {label}
              </label>
            </div>
          </div>
        </div>
        <MdlInsertLinkDialog
          classList = {classList}
          onCallback = {this.onInsertLinkCallback}
          id = {`${id}-markdown-editor-insert-link-dialog`}
          ref = {insertLinkRef}
        />
        {photoDialog(classList, {
          onCallback: this.onInsertPhotoCallback,
          id: `${id}-markdown-editor-insert-photo-dialog`,
          passRef: insertPhotoRef
        })}
      </div>
    );
  }
}

MarkdownTextarea.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  photoDialog: React.PropTypes.func,
  options: React.PropTypes.arrayOf(React.PropTypes.string),
  rows: React.PropTypes.number,
  value: React.PropTypes.string
};

MarkdownTextarea.defaultProps = {
  classList: [],
  id: 'markdown-editor',
  label: 'Text here',
  photoDialog: () => null,
  options: [
    'bold',
    'italics',
    'insertLink',
    'insertPhoto',
    'blockquote',
    'preformated',
    'bulletItem',
    'numberItem',
    'headerText'
  ],
  rows: 2,
  value: ''
};

export default MarkdownTextarea;
