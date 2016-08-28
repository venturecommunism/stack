import React from 'react';
import classNames from 'classnames';
import MdlSpinner from './../atoms/mdl-spinner.jsx';

class MdlAppLoginNav extends React.Component {
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
    const {loginLink, logoutLink, loggedIn, loggingIn, classList} = this.props;

    const className = classNames(
      'mdl-navigation__link',
      'react-mdl-login',
      classList.map((name) => (`${name}-react-mdl-login`))
    );

    if (!loggedIn) {
      return (
        <a
          className={className}
          href={loginLink}
        >
          {'Login'}
        </a>
      );
    } else if (loggingIn) {
      return (
        <MdlSpinner classList = {[...classList, 'react-mdl-logging-in']} />
      );
    }
    return (
      <a
        className={className}
        href={logoutLink}
      >
        {'Logout'}
      </a>
    );
  }
}

MdlAppLoginNav.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  loggedIn: React.PropTypes.bool,
  loggingIn: React.PropTypes.bool,
  loginLink: React.PropTypes.string,
  logoutLink: React.PropTypes.string
};

MdlAppLoginNav.defaultProps = {
  classList: [],
  loggedIn: false,
  loggingIn: false,
  loginLink: '',
  logoutLink: ''
};

export default MdlAppLoginNav;
