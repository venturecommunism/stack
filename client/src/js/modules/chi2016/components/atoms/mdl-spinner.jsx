import React from 'react';
import classNames from 'classnames';

class MdlSpinner extends React.Component {
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
  render() {
    const {classList} = this.props;

    const className = classNames(
      'mdl-spinner',
      'mdl-js-spinner',
      'is-active',
      'react-mdl-spinner',
      classList.map((name) => (`${name}-react-mdl-spinner`))
    );

    return (<div className={className}></div>);
  }
}

MdlSpinner.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string)
};

MdlSpinner.defaultProps = {
  classList: []
};

export default MdlSpinner;
