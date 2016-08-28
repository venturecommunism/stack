import React from 'react';
import classNames from 'classnames';
import Sections from './../organisms/mdl-sections.jsx';

class MdlPage extends React.Component {
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
      appBar,
      appSections,
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
      'mdl-layout mdl-js-layout react-mdl-core-design-page',
      header,
      drawer,
      tabs,
      classList.map((name) => (`${name}-react-mdl-page`))
    );

    return (
      <div className="react-mdl-core-root">
        <div className={className}>
          {appBar(classList)}
          {appDrawer(classList)}
          <main
            className="react-mdl-core-design-page-content
              mdl-layout__content"
          >
            <Sections
              classList = {classList}
              sections = {appSections}
              spacing = {false}
            />

            {appFooter(classList)}
          </main>
        </div>
      </div>
    );
  }
}

MdlPage.propTypes = {
  appBar: React.PropTypes.func,
  appDrawer: React.PropTypes.func,
  appFooter: React.PropTypes.func,
  appSections: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.func),
    React.PropTypes.func
  ]),
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  fixedDrawer: React.PropTypes.bool,
  fixedHeader: React.PropTypes.bool,
  fixedTabs: React.PropTypes.bool
};

MdlPage.defaultProps = {
  appBanner: () => null,
  appBar: () => null,
  appDrawer: () => null,
  appFooter: () => null,
  appSections: () => null,
  classList: [],
  fixedDrawer: false,
  fixedHeader: false,
  fixedTabs: false
};

export default MdlPage;
