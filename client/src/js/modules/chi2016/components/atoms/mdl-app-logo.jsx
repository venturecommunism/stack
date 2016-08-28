import React from 'react';
import classNames from 'classnames';

class MdlAppLogo extends React.Component {
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
    const {src, href, classList} = this.props;

    const className = classNames(
      'mdl-layout-title',
      'react-mdl-app-logo',
      classList.map((name) => (`${name}-react-mdl-app-logo`))
    );

    const anchorClassName = classNames(
      'react-mdl-app-logo-anchor',
      classList.map((name) => (`${name}-react-mdl-app-logo-anchor`))
    );

    const imgClassName = classNames(
      'react-mdl-app-logo-image',
      classList.map((name) => (`${name}-react-mdl-app-logo-image`))
    );

    return (
      <div className={className}>
        <a
          className={anchorClassName}
          href={href}
        >
          <img
            className={imgClassName}
            src={src}
          />
        </a>
      </div>
    );
  }
}

MdlAppLogo.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  href: React.PropTypes.string,
  src: React.PropTypes.string
};

MdlAppLogo.defaultProps = {
  classList: [],
  href: '',
  src: '/default/logo.png'
};

export default MdlAppLogo;
