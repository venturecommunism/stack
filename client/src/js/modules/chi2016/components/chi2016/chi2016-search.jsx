import React from 'react';
import MdlIconButton from './../atoms/mdl-icon-button.jsx';
import {debounce, chiTypes} from './../../libs';

class Chi2016Search extends React.Component {
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
  iconTypes() {
    return [

    ];
  }
  icons() {
    return [
      {
        flag: 'all-flag',
        iconClassName: 'fa fa-list',
        label: 'All'
      },
      {
        flag: 'altchi',
        icon: 'assignment',
        label: 'alt-chi'
      },
      {
        flag: 'casestudy',
        icon: 'assessment',
        label: 'Case Study'
      },
      {
        flag: 'course',
        iconClassName: 'fa fa-sitemap',
        label: 'Course'
      },
      {
        flag: 'panel',
        iconClassName: 'fa fa-users',
        label: 'Panel'
      },
      {
        flag: 'SIG',
        icon: 'lightbulb_outline',
        label: 'SIG'
      },
      {
        flag: 'TOCHI',
        iconClassName: 'fa fa-file-text',
        label: 'TOCHI'
      },
      {
        flag: 'paper',
        iconClassName: 'fa fa-file-text-o',
        label: 'Paper'
      }
    ];
  }
  renderIcons() {
    const {flags, handleSearch} = this.props;
    const icons = this.icons();
    return icons.map((iconObj, key) => {
      const {icon, iconClassName, label, flag} = iconObj;
      const onCallback = () => {
        if (flag === 'all-flag' && flags.indexOf(flag) > -1) {
          handleSearch('CLEAR_FLAG');
        } else if (flag === 'all-flag' && flags.indexOf(flag) < 0) {
          handleSearch('ALL_FLAG');
        } else if (flag !== 'all-flag' && flags.indexOf(flag) > -1) {
          handleSearch('REMOVE_FLAG', 'all-flag');
          handleSearch('REMOVE_FLAG', flag);
        } else {
          handleSearch('ADD_FLAG', flag);
        }
      };
      return (
        <MdlIconButton
          classList = {flags.indexOf(flag) < 0 ? [ 'flag-off' ] : [ 'flag-on' ]}
          key = {key}
          icon = {icon}
          iconClassName = {iconClassName}
          id = {flag}
          label = {label}
          onCallback = {onCallback}
        />
      );
    });
  }
  render() {
    const {handleSearch} = this.props;
    const self = this;
    const inputRef = (c) => {
      this.search = c;
    };
    const handleChange = () => {
      handleSearch('SEARCH', self.search.value);
    };
    return (
      <div className="mdl-grid mdl-grid--no-spacing chi2016-search-container">
        <div className="mdl-cell mdl-cell--12-col">
          {'Search: '}
          <div className="mdl-textfield mdl-js-textfield
            mdl-textfield--expandable chi2016-search-box"
          >
            <label
              className="mdl-button mdl-js-button mdl-button--icon"
              htmlFor="search-input"
            >
              <i className="material-icons">{'search'}</i>
            </label>
            <div className="mdl-textfield__expandable-holder chi2016-search-holder">
              <input
                className="mdl-textfield__input chi2016-search"
                id="search-input"
                onChange={debounce(handleChange, 250)}
                ref={inputRef}
                type="text"
              />
              <label
                className="mdl-textfield__label chi2016-search-label"
                htmlFor="search-input"
              >
                {'Search'}
              </label>
            </div>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--12-col">
          Filter: {this.renderIcons()}
        </div>
        <div className="mdl-cell mdl-cell--12-col">
          Search Type: {this.renderIcons()}
        </div>
      </div>
    );
  }
}

export default Chi2016Search;
