import React from 'react';
import classNames from 'classnames';

class MdlAppTitle extends React.Component {
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
    const {title, href, classList} = this.props;

    const className = classNames(
      'mdl-layout-title',
      'react-mdl-app-title',
      classList.map((name) => (`${name}-react-mdl-app-title`))
    );

    const anchorClassName = classNames(
       'react-mdl-app-title-anchor',
      classList.map((name) => (`${name}-react-mdl-app-title-anchor`))
    );

    return (
      <div className={className}>
        <a
          className={anchorClassName}
          href={href}
        >
          {title}
        </a>
      </div>
    );
  }
}

MdlAppTitle.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  href: React.PropTypes.string,
  title: React.PropTypes.string
};

MdlAppTitle.defaultProps = {
  classList: [],
  href: '/',
  title: 'Title'
};

export default MdlAppTitle;
