import React from 'react';
import classNames from 'classnames';

class MdlSections extends React.Component {
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
  renderSection(section, key) {
    const {classList} = this.props;
    const className = classNames(
      'mdl-cell mdl-cell--12-col',
      classList.map((name) => (`${name}-react-mdl-section`))
    );
    return (
      <div
        className={className}
        key={key}
      >
        {section(classList)}
      </div>
    );
  }
  renderSections() {
    const {sections} = this.props;
    if (typeof sections === 'function') {
      return this.renderSection(sections);
    }
    return sections.map((section, key) => {
      return this.renderSection(section, key);
    });
  }
  render() {
    const {
      classList,
      spacing,
    } = this.props;

    const space = !spacing ? 'mdl-grid--no-spacing' : '';
    const className = classNames(
      'mdl-grid',
      space,
      classList.map((name) => (`${name}-react-mdl-sections`))
    );
    return (
      <div className={className}>
        {this.renderSections()}
      </div>
    );
  }
}

MdlSections.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  sections: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.func),
    React.PropTypes.func
  ]),
  spacing: React.PropTypes.bool
};

MdlSections.defaultProps = {
  classList: [],
  sections: () => null,
  spacing: false
};

export default MdlSections;
