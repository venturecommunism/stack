import React from 'react';
import classNames from 'classnames';

class MdlNavLink extends React.Component {
  componentDidMount() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
    // add window event listener to detect width
    // and change the padding on secondary link
  }
  componentDidUpdate() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
  }
  renderDropdown(links) {
    const {classList} = this.props;

    const itemClassName = classNames(
      'mdl-menu__item',
      'react-nav-dropdown-item',
      classList.map((name) => (`${name}-react-nav-dropdown-item`))
    );

    const anchorClassName = classNames(
      'react-nav-dropdown-link',
      classList.map((name) => (`${name}-react-nav-dropdown-link`))
    );

    return links.map((link, key) => {
      const {href, label} = link;
      return (
        <li
          className={itemClassName}
          data-link-href={href}
          key={key}
        >
          <a
            className={anchorClassName}
            href={href}
          >
            {label}
          </a>
        </li>
      );
    });
  }
  renderSecondary(links) {
    const {classList} = this.props;

    const className = classNames(
      'mdl-navigation__link',
      'react-nav-secondary-link',
      classList.map((name) => (`${name}-react-nav-secondary-link`))
    );

    return links.map((link, key) => {
      const {href, label} = link;
      return (
        <a
          className={className}
          href={href}
          key={key}
        >
          {label}
        </a>
      );
    });
  }
  render() {
    const {
      label,
      id,
      links,
      href,
      classList,
      position,
      dropdownClassList
    } = this.props;

    const className = classNames(
      'mdl-navigation__link',
      'react-nav-link',
      classList.map((name) => (`${name}-react-nav-link`))
    );

    const dropdownClassName = classNames(
      'mdl-menu',
      'mdl-menu--bottom-left',
      'mdl-js-menu',
      'mdl-js-ripple-effect',
      'react-nav-link-dropdown',
      dropdownClassList.map((name) => (`${name}-react-nav-link-dropdown`))
    );

    if (links && links.length > 0) {
      if (position === 'app-bar') {
        return (
          <span>
            <a
              className={className}
              href=""
              id={`${id}-react-nav-link-dropdown`}
            >
              {label}
            </a>
            <ul
              className={dropdownClassName}
              htmlFor={`${id}-react-nav-link-dropdown`}
            >
              {this.renderDropdown(links)}
            </ul>
          </span>
        );
      }
      return (
        <span>
          <a
            className={className}
            href=""
          >
            {label}
          </a>
          {this.renderSecondary(links)}
        </span>
      );
    }
    return (
      <a
        className={className}
        href={href}
      >
        {label}
      </a>
    );
  }
}

MdlNavLink.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  dropdownClassList: React.PropTypes.arrayOf(React.PropTypes.string),
  href: React.PropTypes.string,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  links: React.PropTypes.arrayOf(React.PropTypes.shape({
    href: React.PropTypes.string,
    label: React.PropTypes.string
  })),
  position: React.PropTypes.string
};

MdlNavLink.defaultProps = {
  classList: [],
  dropdownClassList: [],
  href: '',
  id: 'react-mdl-nav-link-id',
  label: 'Dead Link',
  position: 'app-bar'
};

export default MdlNavLink;
