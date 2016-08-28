import React from 'react';
import firstBy from 'thenby';
import zenscroll from 'zenscroll';

class LBW extends React.Component {
  componentDidMount() {
    this.scrollToTime();
  }
  componentDidUpdate() {
    this.scrollToTime(true);
  }
  scrollToTime(flag) {
    const {query} = this.props;
    const {cat} = query;
    const time = 500;
    const main = document.getElementById('chi2016-main-content');
    const scroller = zenscroll.createScroller(main, 500);
    const offsetScroll = window.innerWidth >= 480 ? 10 : 51;
    clearInterval(this.scrollerId);
    if (cat) {
      const target = document.getElementById(cat);
      if (target) {
        const scrollNow = () => {
          scroller.toY(main.scrollTop + target.getBoundingClientRect().top - offsetScroll);
          let diff = target.getBoundingClientRect().top - offsetScroll;
          if (diff === 0 || Math.abs(diff) < 5) {
            clearInterval(this.scrollerId);
          } else {
            console.log(diff)
          }
        };
        scrollNow();
        this.scrollerId = setInterval(scrollNow, time);
      }
    }
  }
  categories() {
    return [
      'Collaborative Technologies',
      'Designing Interactive Systems',
      'Engineering of Interactive Systems',
      'Extending User Capabilities',
      'Games & Playful Interaction',
      'Interaction in Specific Domains',
      'Novel Interactions',
      'People and Contexts',
      'Usable, Useful, and Desirable'
    ];
  }
  renderCategoryList(groupName) {
    const categories = this.categories();
    return categories.map((item) => {
      const id = `?tab=chi2016-lbw&cat=${groupName}-${item.split(' ').join('-')
        .replace(/\&/g, 'and')
        .replace(/,/g, '')}`;
      return (
        <li>
          <a href={id}>
            {item}
          </a>
        </li>
      );
    });
  }
  renderCategory(item, flag, groupName) {
    return flag ? (
      <div
        id={`${groupName}-${item.category.split(' ').join('-')
          .replace(/\&/g, 'and').replace(/,/, '')}`}
        className="mdl-cell mdl-cell--12-col lbw-category-title"
      >
        {item.category}
      </div>
    ) : null;
  }
  renderAward(award) {
    if (award) {
      if (award === 'bp') {
        return (
          <img
            className = 'chi2016-award-icon'
            src = 'src/images/icon_1198.png'
            alt = 'Best Paper'
          />
        );
      } else if (award === 'hm') {
        return (
          <img
            className = 'chi2016-honorable-icon'
            src = 'src/images/icon_1199.png'
            alt = 'Honorable Mention'
          />
        );
      }
    }
    return null;
  }
  renderGroup(group, groupName) {
    var list = [];
    var itemCat = null;
    for (var i in group) {
      if (group[i]) {
        list.push(group[i]);
      }
    }
    return list.sort(
      firstBy((a, b) => {
        return a.category.localeCompare(b.category);
      }).thenBy((a, b) => {
        return a.title.localeCompare(b.title);
      })
    ).map((item, key) => {
      var flag = itemCat !== item.category;
      if (flag) {
        itemCat = item.category;
      }
      return (
        <div className="mdl-cell mdl-cell--12-col">
          <div className="mdl-grid--no-spacing">
            {this.renderCategory(item, flag, groupName)}
            <div className="mdl-cell mdl-cell--12-col lbw-item">
              <div className="mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell mdl-cell--12-col lbw-item-award">
                  {this.renderAward(item.award)}
                </div>
                <div className="mdl-cell mdl-cell--12-col lbw-item-title">
                  Poster #{item.poster}: {item.title}
                </div>
                <div className="mdl-cell mdl-cell--12-col lbw-item-name">
                  {`Presenter: ${item.name.split(', ').reverse().join(' ')}`}
                </div>
              </div>
            </div>
          </div>
        </div>

      );
    });
  }
  render() {
    const {lbw} = this.props;
    return (
      <div className="mdl-grid lbw">
        <div className="mdl-cell mdl-cell--12-col lbw-title">
          Late-Breaking Work Schedule
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet lbw-group">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col lbw-group-title">
              Monday, May 9 - Tuesday, May 10
            </div>
            <div className="mdl-cell mdl-cell--12-col lbw-category-list">
              <ul>
                {this.renderCategoryList('group1')}
              </ul>
            </div>
            {this.renderGroup(lbw.group1, 'group1')}
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet lbw-group">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col lbw-group-title">
              Wednesday, May 11 - Thursday, May 12
            </div>
            <div className="mdl-cell mdl-cell--12-col lbw-category-list">
              <ul>
                {this.renderCategoryList('group1')}
              </ul>
            </div>
            {this.renderGroup(lbw.group2, 'group2')}
          </div>
        </div>
      </div>
    );
  }
}

export default LBW;
