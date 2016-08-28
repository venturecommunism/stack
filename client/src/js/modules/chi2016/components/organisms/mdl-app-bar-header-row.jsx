import React from 'react';
import classNames from 'classnames';

class MdlAppBarHeaderRow extends React.Component {
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
    const {appTitle, appNav, classList} = this.props;
    const className = classNames(
      'mdl-layout__header-row',
      'react-mdl-header-row',
      classList.map((name) => (`${name}-react-header-row`)));
    return (
      <div className={className}>
        {appTitle(classList)}
        <div className="mdl-layout-spacer"></div>
        {appNav(classList)}
      </div>
    );
  }
}

MdlAppBarHeaderRow.propTypes = {
  appNav: React.PropTypes.func,
  appTitle: React.PropTypes.func,
  classList: React.PropTypes.arrayOf(React.PropTypes.string)
};

MdlAppBarHeaderRow.defaultProps = {
  appTitle: () => null,
  appNav: () => null,
  classList: []
};

export default MdlAppBarHeaderRow;
