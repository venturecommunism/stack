import React from 'react';
import Landing from './components/chi2016-v2/landing.jsx';

import Tabs from './containers/v2/tabs';
import Search from './containers/v2/search';

export default (injectDeps, context) => {
  const {mount, page, qs} = context;
  const LandingCtx = injectDeps(Landing);

  const main = (ctx) => {
    const q = qs.parse(ctx.querystring);
    const searchWords = q.search && q.search.toLowerCase().trim() !== '' ?
      q.search.toLowerCase().trim().split(' ') : [];
    let searchRegex = q.search && q.search.toLowerCase().trim() !== '' ?
      `(${q.search.toLowerCase().replace(/( )+/g, '[\\w\\W]*( )*[\\w\\W]*')})` : '';
    for (let i = 0; i < searchWords.length; i++) {
      searchRegex += searchWords[i].trim() !== '' ? `|(${searchWords[i]})+` : '';
    }
    const query = q.search ? Object.assign({}, q, {
      searchRegex: new RegExp(searchRegex)
    }) : q;
    mount(LandingCtx, {
      displayName: 'LandingCtx',
      sections: [
        () => (React.createElement(Search, {
          displayName: 'Search',
          query
        })),
        () => (React.createElement(Tabs, {
          displayName: 'Tabs',
          query
        }))
      ]
    });
  };

  page.base('/program');
  page('/', main);
  page('/program', main);
  page();
};
