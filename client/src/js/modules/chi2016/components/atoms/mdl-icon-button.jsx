import React from 'react';
import MdlTooltip from './../atoms/mdl-tooltip.jsx';
import classNames from 'classnames';

class MdlIconButton extends React.Component {
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
    const {onCallback, icon, id, label, classList, iconClassName} = this.props;
    const className = classNames(
      'mdl-button',
      'mdl-js-button',
      'mdl-button--icon',
      'react-mdl-icon-button',
      classList.map((name) => (`${name}-react-mdl-icon-button`))
    );
    return (
      <span>
        <button
          className={className}
          id={`${id}-react-mdl-icon-button`}
          onClick={onCallback}
        >
          <i className={iconClassName}>
            {iconClassName !== 'material-icons' ? '' : icon}
          </i>
        </button>
        <MdlTooltip
          id={`${id}-react-mdl-icon-button`}
          label={label}
        />
      </span>
    );
  }
}

MdlIconButton.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  icon: React.PropTypes.string,
  iconClassName: React.PropTypes.string,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  onCallback: React.PropTypes.func,
};

MdlIconButton.defaultProps = {
  classList: [],
  icon: 'help',
  iconClassName: 'material-icons',
  id: 'placeholder-button',
  label: 'Placeholder',
  onCallback: () => null,
};

export default MdlIconButton;
