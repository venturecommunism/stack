import React from 'react';
import classNames from 'classnames';

class MdlTooltip extends React.Component {
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
    const {id, label, classList} = this.props;
    const className = classNames(
      'mdl-tooltip',
      'react-mdl-tooltip',
      classList.map((name) => (`${name}-react-mdl-tooltip`))
    );

    return (
      <div
        className={className}
        htmlFor={id}
      >
        {label}
      </div>
    );
  }
}

MdlTooltip.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  id: React.PropTypes.string,
  label: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string])
};

MdlTooltip.defaultProps = {
  classList: [],
  id: 'mdl-tooltip-id',
  label: 'Label'
};

export default MdlTooltip;
