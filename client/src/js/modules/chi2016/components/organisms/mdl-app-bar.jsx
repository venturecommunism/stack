import React from 'react';
import classNames from 'classnames';

class MdlAppBar extends React.Component {
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
      classList,
      headerTop,
      headerBottom,
      transparent,
      scroll,
      seamed,
      waterfall,
      waterfallTop
    } = this.props;

    const transparentFlag = transparent ? 'mdl-layout__header--transparent' : '';
    const scrollFlag = scroll ? 'mdl-layout__header--scroll' : '';
    const seamedFlag = seamed ? 'mdl-layout__header--seamed' : '';
    const waterfallFlag = waterfall ? 'mdl-layout__header--waterfall' : '';
    const waterfallTopFlag = waterfall && waterfallTop ?
      'mdl-layout__header--waterfall-hide-top' : '';

    const className = classNames(
      'mdl-layout__header',
      seamedFlag,
      transparentFlag,
      scrollFlag,
      waterfallFlag,
      waterfallTopFlag,
      'react-mdl-app-bar',
      classList.map((name) => (`${name}-react-mdl-app-bar`))
    );

    return (
      <header className={className}>
        {headerTop(classList)}
        {headerBottom(classList)}
      </header>
    );
  }
}

MdlAppBar.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  headerBottom: React.PropTypes.func,
  headerTop: React.PropTypes.func,
  scroll: React.PropTypes.bool,
  seamed: React.PropTypes.bool,
  transparent: React.PropTypes.bool,
  waterfall: React.PropTypes.bool,
  waterfallTop: React.PropTypes.bool
};

MdlAppBar.defaultProps = {
  classList: [],
  headerBottom: () => null,
  headerTop: () => null,
  scroll: false,
  seamed: false,
  transparent: false,
  waterfall: false,
  waterfallTop: false
};

export default MdlAppBar;
