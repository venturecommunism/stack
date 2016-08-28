import React from 'react';
import classNames from 'classnames';
import Sections from './../organisms/mdl-sections.jsx';

class MdlLanding extends React.Component {
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
    const {
      appBanner,
      appBar,
      appContent,
      appDrawer,
      appFooter,
      fixedDrawer,
      fixedHeader,
      fixedTabs,
      classList
    } = this.props;

    const header = fixedHeader ? 'mdl-layout--fixed-header' : '';
    const drawer = fixedDrawer ? 'mdl-layout--fixed-drawer' : '';
    const tabs = fixedTabs ? 'mdl-layout--fixed-tabs' : '';
    const className = classNames(
      'mdl-layout mdl-js-layout react-mdl-core-design-landing',
      header,
      drawer,
      tabs,
      classList.map((name) => (`${name}-react-mdl-landing`))
    );
    const mainClassName = classNames(
      'react-mdl-core-design-landing-content',
      'mdl-layout__content',
      classList.map((name) => (`${name}-react-mdl-main-content`))
    );

    return (
      <div className="react-mdl-core-root">
        <div className={className}>
          {appBar(classList)}
          {appDrawer(classList)}
          <main className={mainClassName} >
            {appBanner(classList)}

            <Sections
              classList = {classList}
              sections = {appContent}
              spacing = {false}
            />

            {appFooter(classList)}
          </main>
        </div>
      </div>
    );
  }
}

MdlLanding.propTypes = {
  appBanner: React.PropTypes.func,
  appBar: React.PropTypes.func,
  appContent: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.func),
    React.PropTypes.func
  ]),
  appDrawer: React.PropTypes.func,
  appFooter: React.PropTypes.func,
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  fixedDrawer: React.PropTypes.bool,
  fixedHeader: React.PropTypes.bool,
  fixedTabs: React.PropTypes.bool
};

MdlLanding.defaultProps = {
  appBanner: () => null,
  appBar: () => null,
  appContent: () => null,
  appDrawer: () => null,
  appFooter: () => null,
  classList: [],
  fixedDrawer: false,
  fixedHeader: false,
  fixedTabs: false
};

export default MdlLanding;
