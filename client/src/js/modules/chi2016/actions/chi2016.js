const {console} = window;

export default {
  handleSearch: (context, type, value, query) => {
    const {chi2016Store, page, qs} = context;
    if (type === 'SEARCH') {
      const q = qs.stringify(Object.assign({}, query, {
        search: value,
        slot: null,
        session: null,
        tab: query.tab && query.tab !== 'chi2016-events' ? query.tab : 'chi2016-schedule'
      }));
      page(`?${q}`);
    } else {
      chi2016Store.dispatch({type, value});
    }
  },
  handleTabs: (context, tab, query) => {
    const {page, qs} = context;
    const {search} = query;
    const obj = tab === 'chi2016-schedule' ?
      {search, tab, showAll: true} : {search, tab};
    const q = qs.stringify(Object.assign({}, obj));
    page(`?${q}`);
  },
  handleScheduleSessionSwitch: (context, {entity, slot, session, day, tab = 'chi2016-schedule',
    query, showAll}) => {
    const {page, qs} = context;
    if (query.showAll) {
      query.showAll = null;
    }
    const q = qs.stringify(Object.assign({}, query, {
      tab,
      slot,
      session,
      day,
      entity,
      showAll
    }));
    page(`?${q}`);
  },
  registerDialog: (context, dialog) => {
    const {chi2016Store} = context;
    chi2016Store.dispatch({type: 'REGISTER_DIALOG', value: dialog});
  }
  // handleGlanceSwitch: (context, slot)
  // handleSchedule: (context) => {
  //   const {Firebase, location, chi2016Store} = context;
  //   chi2016Store.dispatch({
  //     type: 'CLEAR'
  //   });
  //   const schedule = new Firebase(`${location}schedule`);
  //   schedule.on('value', (data) => {
  //     chi2016Store.dispatch({
  //       type: 'BULK_ADD_SCHEDULE',
  //       value: data.val()
  //     });
  //   });
  //   const sessions = [];
  //   const sessionsRef = new Firebase(`${location}sessions`);
  //   // sessions.on('value', (data) => {
  //   //   chi2016Store.dispatch({
  //   //     type: 'BULK_ADD_SESSIONS',
  //   //     value: data.val()
  //   //   });
  //   //   // data.forEach((child) => {
  //   //   //   chi2016Store.dispatch({
  //   //   //     type: 'UPDATE_SESSION',
  //   //   //     value: child.val(),
  //   //   //     index: child.key()
  //   //   //   });
  //   //   // });

  //   // });
  //   // sessionsRef.on('child_added', (data) => {
  //   //   const obj = {
  //   //     val: data.val(),
  //   //     key: data.key()
  //   //   };
  //   //   sessions.push(obj);
  //   //   // chi2016Store.dispatch({
  //   //   //   type: 'UPDATE_SESSION',
  //   //   //   value: data.val(),
  //   //   //   index: data.key()
  //   //   // });
  //   // });
  //   // setInterval(() => {
  //   //   if (sessions.length > 0) {
  //   //     const data = sessions.pop();
  //   //     chi2016Store.dispatch({
  //   //       type: 'UPDATE_SESSION',
  //   //       value: data.val,
  //   //       index: data.key
  //   //     });
  //   //   }
  //   // }, 10);

  //   const entities = new Firebase(`${location}entities`);

  //   // entities.on('child_added', (data) => {
  //   //   chi2016Store.dispatch({
  //   //     type: 'UPDATE_ENTITY',
  //   //     value: data.val(),
  //   //     index: data.key()
  //   //   });
  //   // });
  //   // entities.on('child_changed', (data) => {
  //   //   chi2016Store.dispatch({
  //   //     type: 'UPDATE_ENTITY',
  //   //     value: data.val(),
  //   //     index: data.key()
  //   //   });
  //   // });
  //   // entities.on('child_removed', (data) => {
  //   //   chi2016Store.dispatch({
  //   //     type: 'UPDATE_ENTITY',
  //   //     value: null,
  //   //     index: data.key()
  //   //   });
  //   // });
  //   // (new Firebase(`${location}entities`)).on('value', (data) => {
  //   //   chi2016Store.dispatch({
  //   //     type: 'BULK_ADD_ENTITIES',
  //   //     value: data.val()
  //   //   });
  //   //   data.ref().on('child_changed', (child) => {
  //   //     chi2016Store.dispatch({
  //   //       type: 'UPDATE_ENTITY',
  //   //       value: child.val(),
  //   //       index: child.key()
  //   //     });
  //   //   });
  //   // });
  // },
};
