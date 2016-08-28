import React from 'react';
import classNames from 'classnames';

class MdlInputText extends React.Component {
  constructor() {
    super();
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
      'mdl-textfield--floating-label',
      'react-mdl-input-text',
      classList.map((name) => (`${name}-react-mdl-input-text`))
    );
  }
  textfieldValueCheck() {
    if (this.textfield && this.textfieldContainer) {
      this.textfieldContainer.className = this.textfield.value.trim() === '' ?
        this.defaultClassNames() :
        classNames(this.textfieldContainer.className.split(' '), 'is-dirty');
    }
  }
  getValue() {
    return this.textfield.value;
  }
  setValue(value) {
    this.textfield.value = value;
    this.textfieldValueCheck();
  }
  render() {
    const {id, label, value, pattern} = this.props;
    const className = this.defaultClassNames();

    const textfield = (c) => {
      this.textfield = c;
    };

    const textfieldContainer = (c) => {
      this.textfieldContainer = c;
    };

    return (
      <div
        className={className}
        ref={textfieldContainer}
      >
        <input
          className="mdl-textfield__input react-mdl-input-text-input"
          defaultValue={value}
          id={`${id}-react-mdl-input-text`}
          pattern={pattern}
          ref = {textfield}
          type="text"
        />
        <label
          className="mdl-textfield__label react-mdl-input-text-label"
          htmlFor={`${id}-react-mdl-input-text`}
        >
          {label}
        </label>
      </div>
    );
  }
}

MdlInputText.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  pattern: React.PropTypes.string,
  value: React.PropTypes.string
};

MdlInputText.defaultProps = {
  classList: [],
  id: 'react-mdl-input-text-id',
  label: 'Input Text here'
};

export default MdlInputText;
