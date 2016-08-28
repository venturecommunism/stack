export const chi2016StoreComposer = ({context, query}, onData) => {
  const {chi2016Store} = context();
  const getState = () => {
    const {flags, searchTypes, dialog} = chi2016Store.getState();
    onData(null, {flags, searchTypes, query, dialog});
  };
  getState();
  return chi2016Store.subscribe(getState);
};

export const otherSessionsComposer = ({context, sessionObj}, onData) => {
  const {location, Firebase} = context();
  const id = sessionObj.session;
  const othersRef = new Firebase(`${location}other-sessions/${id}`);
  othersRef.once('value', (data) => {
    const session = data.val();
    onData(null, {session});
  });
  onData(null, {session: null});
};

export const lbwComposer = ({context}, onData) => {
  const {location, Firebase} = context();
  const ref = new Firebase(`${location}lbw`);
  ref.once('value', (data) => {
    const lbw = data.val();
    onData(null, {lbw});
  });
};

export const scheduleComposer = ({context}, onData) => {
  const {location, Firebase, _} = context();
  const ref = new Firebase(`${location}schedule`);
  const newRef = new Firebase(`${location}full-schedule`);

  const scheduleCallback = (data) => {

    const oldSchedule = data.val();

    const fullScheduleCallback = (fullData) => {
      const schedule = fullData.val();
      let k = 0;
      for (let i = 0; i < schedule.length; i++) {
        const newSlots = [];
        const sched = schedule[i];
        const oldSched = oldSchedule[k];
        if (oldSched.date === sched.date) {
          k++;
        }

        const {slots} = sched;
        const oldSlots = oldSched.slots ? oldSched.slots : [];
        for (let j = 0; j < slots.length; j++ ) {
          const slot = slots[j];
          const {slot_id} = slot;
          const oldSlot = _.findWhere(oldSlots, {slot_id});
          if (oldSlot) {
            newSlots.push(oldSlot);
          } else {
            newSlots.push(slot);
          }
        }
        schedule[i].slots = newSlots;
      }
      // console.log(schedule)
      onData(null, {schedule});
      newRef.off('value', fullScheduleCallback);
    };


    newRef.orderByKey().on('value', fullScheduleCallback)
    // data.forEach((child) => {
    //   const sched = child.val();
    //   sched.slots = [];
    //   const childRef = child.ref();

    //   const slotsCallback = (slots) => {
    //     slots.forEach((slot) => {
    //       sched.slots.push(slot.val());
    //     });
    //   };

    //   childRef.child('slots').orderByKey().once('value', slotsCallback);
    //   schedule.push(sched);
    // });
    ref.off('value', scheduleCallback);
  };

  ref.orderByKey().on('value', scheduleCallback);
};

export const entityComposer = ({context, className, id}, onData) => {
  const {location, Firebase} = context();
  const entityRef = new Firebase(`${location}entities/${id}`);

  const processData = (data) => {
    const entity = data.val();
    onData(null, {entity, id});
  };

  if (className === 'break' || className === 'plenary' || className === 'end') {
    entityRef.once('value', processData);
  } else {
    entityRef.once('value', processData);
  }
};

export const sessionComposer = ({context, className, sessionObj, slotId, day}, onData) => {
  const {location, Firebase} = context();
  // const {searchRegex, search, tab} = query;
  const id = sessionObj.session;
  const sessionRef = new Firebase(`${location}sessions/${id}`);
  const othersRef = new Firebase(`${location}other-sessions/${id}`);

  const processData = (data) => {
    const session = data.val();
    console.log(session)
    onData(null, {day, slotId, session, id, className});
    // if (session) {
    //   const {s_title, chair} = session;
    //   if (!search || search.trim() === '' ||
    //     s_title.toLowerCase().trim().match(searchRegex) ||
    //     chair.toLowerCase().trim().match(searchRegex)
    //   ) {
    //     onData(null, {day, slotId, session, id, query, className});
    //   } else if (tab === 'chi2016-schedule') {
    //     onData(null, {day, session, slotId, id, query, className});
    //   } else {
    //     onData(null, {day, slotId, id, query, className});
    //   }
    // } else {
    //   onData(null, {day, slotId, id, query, className});
    // }
  };

  if (className === 'break' || className === 'plenary' || className === 'end' ||
    className === 'weekend') {
    othersRef.once('value', processData);
  } else {
    sessionRef.once('value', processData);
  }
};

export const injectActions = (context, actions) => ({
  context: () => (context),
  handleScheduleSessionSwitch: actions.chi2016.handleScheduleSessionSwitch,
  hideObject: actions.chi2016.hideObject,
  showObject: actions.chi2016.showObject
});
