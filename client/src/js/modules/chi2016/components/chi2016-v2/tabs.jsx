import React from 'react';
import Events from './../../containers/v2/events';
import Confapp from './../../components/chi2016-v2/confapp.jsx';
import Abstracts from './../../containers/v2/abstract-schedule';
import Schedule from './../../containers/v2/schedule';
import LBW from './../../containers/v2/lbw';
import _ from 'underscore';

class Chi2016Tabs extends React.Component {
  constructor() {
    super();
    this.onHandleTabClick = this.onHandleTabClick.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.query, nextProps.query);
  }
  tabBar() {
    return [
      {
        id: 'chi2016-events',
        label: 'Schedule of Events',
        mid: 'Events View',
        small: 'Events',
        section: () => (React.createElement(Events, {
          displayName: 'Events'
        }))
      },
      // {
      //   id: 'chi2016-glance',
      //   label: 'Schedule at a Glance',
      //   mid: 'Glance View',
      //   small: 'Glance',
      //   section: (query) => (React.createElement(Glance, {
      //     displayName: 'Glance',
      //     query
      //   }))
      // },
      {
        id: 'chi2016-schedule',
        label: 'Full Schedule',
        mid: 'Full View',
        small: 'Full',
        section: (query) => (React.createElement(Schedule, {
          displayName: 'Schedule',
          query
        }))
      },
      {
        id: 'chi2016-abstract',
        label: 'Abstracts Schedule View',
        mid: 'Abstracts View',
        small: 'Abstracts',
        section: (query) => (React.createElement(Abstracts, {
          displayName: 'Abstracts',
          query
        }))
      },
      {
        id: 'chi2016-lbw',
        label: 'Late-Breaking Work',
        mid: 'Late-Breaking',
        small: 'LBW',
        section: (query) => (React.createElement(LBW, {
          displayName: 'LBW',
          query
        }))
      },
      {
        id: 'chi2016-app',
        label: 'Conference App',
        mid: 'Conf App',
        small: 'ConfApp',
        section: () => (React.createElement(Confapp, {
          displayName: 'Confapp'
        }))
      },
    ];
  }
  onHandleTabClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const checkParent = (target) => {
      if (!target) {
        return null;
      }
      return target.getAttribute('data-chi2016-id') ?
        target.getAttribute('data-chi2016-id') :
        checkParent(target.parentNode);
    };
    this.setTab(checkParent(e.target));
  }
  setTab(tab = 'chi2016-events') {

    const {handleTabs, query} = this.props;
    if (tab === 'chi2016-glance') {
      window.open('http://confer.csail.mit.edu/chi2016/schedule', '_blank');
      handleTabs('chi2016-events', query);
    } else {
      handleTabs(tab, query);
    }
  }
  renderTabBar() {
    const {query} = this.props;
    const {tab = 'chi2016-events'} = query;
    const tabBar = this.tabBar();
    return tabBar.map((tabButton, key) => {
      const {id, label, small, mid} = tabButton;
      const className = tab === id ?
        'mdl-tabs__tab chi2016-tab-button is-active' :
        'mdl-tabs__tab chi2016-tab-button';
      return (
        <a
          href={`#${id}`}
          data-chi2016-id={id}
          className={className}
          key={key}
          onClick={this.onHandleTabClick}
        >
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--12-col mdl-cell--hide-phone
              mdl-cell--hide-tablet"
            >
              {label}
            </div>
            <div className="mdl-cell mdl-cell--8-col-tablet mdl-cell--hide-desktop
              mdl-cell--hide-phone"
            >
              {mid}
            </div>
            <div className="mdl-cell mdl-cell--4-col-phone mdl-cell--hide-desktop
              mdl-cell--hide-tablet"
            >
              {small}
            </div>
          </div>

        </a>
      );
    });
  }
  renderTabComponent() {
    const {query} = this.props;
    const { tab = 'chi2016-events' } = query;
    const tabBar = this.tabBar();
    return tabBar.map((tabButton, key) => {
      const {id, section} = tabButton;
      const className = tab === id ?
        'mdl-tabs__panel chi2016-tab-panel is-active' :
        'mdl-tabs__panel chi2016-tab-panel';
      return (
        <div
          className={className}
          id={id}
          key={key}
        >
          {tab === id ? section(query) : null}
        </div>
      );
    });
  }
  render() {
    return (
      <div className="mdl-grid mdl-grid--no-spacing chi2016-tabs">
        <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset-desktop
          mdl-cell--8-col-tablet mdl-cell--4-col-phone chi2016-tabs-container"
        >
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
              <div className="mdl-tabs__tab-bar chi2016-tab-bar">
                {this.renderTabBar()}

              </div>
              {this.renderTabComponent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chi2016Tabs;
