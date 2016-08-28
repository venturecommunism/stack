import React from 'react';
import classNames from 'classnames';
import TitleText from './../molecules/title-text.jsx';
import {placeholders, windowSize} from './../../libs';

class MdlBanner extends React.Component {
  componentDidMount() {
    const banner = this.banner;
    const {heightPercent} = this.props;
    const bannerResize = () => {
      const {height} = windowSize();
      const minHeight = (height - 16) * heightPercent;
      banner.style['min-height'] = `${minHeight}px`;
    };

    if (componentHandler) {
      componentHandler.upgradeDom();
    }
    if (window) {
      bannerResize();
      window.addEventListener('resize', bannerResize);
    }
  }
  componentDidUpdate() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
  }
  renderSection(sectionPosition, small) {
    const {title, text, extraSection, position, classList} = this.props;
    if (position === sectionPosition) {
      return (
        <TitleText
          align = {small ? 'center' : position}
          classList = {classList}
          text = {text}
          textSize = {20}
          textWeight = "regular"
          title = {title}
          titleSize = {56}
          titleWeight = "light"
        />
      );
    }
    return extraSection(classList);
  }
  render() {
    const {
      title,
      text,
      position,
      backgroundImage,
      classList,
      extraSection
    } = this.props;

    const className = classNames(
      'react-mdl-banner',
      'mdl-grid',
      classList.map((name) => (`${name}-react-mdl-banner`))
    );

    const style = {
      backgroundImage: `linear-gradient(rgba(0,0,0,0),
        rgba(0,0,0,0), rgba(0,0,0,0.7)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top'
    };

    const banner = (c) => {
      this.banner = c;
    };

    if (position === 'center') {
      return (
        <div
          className={className}
          ref={banner}
          style={style}
        >
          <div className="mdl-cell mdl-cell--12-col mdl-cell--bottom">
            <TitleText
              align = {position}
              classList = {classList}
              text = {text}
              textSize = {20}
              textWeight = "regular"
              title = {title}
              titleSize = {56}
              titleWeight = "light"
            />
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            {extraSection(classList)}
          </div>
        </div>
      );
    }
    return (
      <div
        className={className}
        ref={banner}
        style={style}
      >
        <div className="mdl-cell mdl-cell--6-col mdl-cell--hide-tablet
          mdl-cell--hide-phone mdl-cell--bottom"
        >
          <div className="react-mdl-banner-left-section">
            {this.renderSection('left')}
          </div>
        </div>
        <div className="mdl-cell mdl-cell--12-col mdl-cell--hide-desktop
          mdl-cell--bottom"
        >
          {this.renderSection('left', true)}
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--hide-tablet
          mdl-cell--hide-phone mdl-cell--bottom"
        >
          <div className="react-mdl-banner-right-section">
            {this.renderSection('right')}
          </div>
        </div>
        <div className="mdl-cell mdl-cell--12-col mdl-cell--hide-desktop
          mdl-cell--bottom"
        >
          {this.renderSection('right', true)}
        </div>
      </div>
    );
  }
}

MdlBanner.propTypes = {
  backgroundImage: React.PropTypes.string,
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  extraSection: React.PropTypes.func,
  heightPercent: React.PropTypes.number,
  position: React.PropTypes.oneOf(['left', 'right', 'center']),
  text: React.PropTypes.string,
  title: React.PropTypes.string
};

MdlBanner.defaultProps = {
  backgroundImage: placeholders.image16x9,
  classList: [],
  extraSection: () => null,
  heightPercent: 1,
  position: 'left'
};

export default MdlBanner;
