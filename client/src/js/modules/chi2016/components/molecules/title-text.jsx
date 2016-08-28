import React from 'react';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import {placeholders} from './../../libs';

class TitleText extends React.Component {
  render() {
    const {
      title,
      titleWeight,
      titleSize,
      text,
      textWeight,
      textSize,
      align,
      classList
    } = this.props;
    const className = classNames(
      'react-mdl-title-text',
      classList.map((name) => (`${name}-react-mdl-title-text`))
    );
    const titleTextStyle = {
      textAlign: align
    };
    const titleStyle = {
      fontSize: titleSize,
      fontWeight: titleWeight === 'light' ? 300 : titleWeight
    };
    const textStyle = {
      width: '100%',
      fontSize: textSize,
      fontWeight: textWeight === 'light' ? 300 : textWeight
    };
    return (
      <div
        className={className}
        style={titleTextStyle}
      >
        <h1
          className="react-mdl-title"
          style={titleStyle}
        >
          {title}
        </h1>
        <div
          className="react-mdl-text"
          style={textStyle}
        >
          <ReactMarkdown source={text} />
        </div>
      </div>
    );
  }
}

TitleText.propTypes = {
  align: React.PropTypes.oneOf(['left', 'right', 'center']),
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  text: React.PropTypes.string,
  textSize: React.PropTypes.number,
  textWeight: React.PropTypes.oneOf(['regular', 'light', 'bold']),
  title: React.PropTypes.string,
  titleSize: React.PropTypes.number,
  titleWeight: React.PropTypes.oneOf(['regular', 'light', 'bold'])
};

TitleText.defaultProps = {
  align: 'left',
  classList: [],
  text: placeholders.shortText,
  textSize: 20,
  textWeight: 'regular',
  title: placeholders.shortTitle,
  titleSize: 56,
  titleWeight: 'light'
};

export default TitleText;
