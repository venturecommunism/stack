  /**
   * Define some components
   */

  const componentdatoms = [
    {
      ':db/id': -1,
      'componentsname': 'Subcomponent',
      'componentsparents': [-5, -18],
      'componentstype': 'subcomponent'
    },
    {
      ':db/id': -2,
      'componentsname': 'multipleplaces',
      'componentsparents': [-1, -5, -18],
      'componentstype': 'action',
      'componentsfunction': `({conn, transact}, e) {
        var date = new Date().getTime()
        transact(conn, [{
          ':db/id': -1,
          description: 'multipleplaces test',
          date: date,
          status: 'pending',
          uuid: 'uuid-' + date
        }])
      }`
    },
    {
      ':db/id': -3,
      'componentsname': 'anotheraction',
      'componentsparents': -1,
      'componentstype': 'action',
      'componentsfunction': `({conn, transact}, e) {
        var date = new Date().getTime()
        transact(conn, [{
          ':db/id': -1,
          description: 'anotheraction test',
          date: date,
          status: 'pending',
          uuid: 'uuid-' + date
        }])
      }`
    },
    {
      ':db/id': -4,
      'componentsname': 'Data Component',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -5,
      'componentsname': 'NewRoot',
      'componentstype': 'root',
      'componentid': 'newrootcore'
    },
    {
      ':db/id': -6,
      'componentsname': 'Second Data Component',
      'componentsparents': -1,
      'componentstype': 'data'
    },
    {
      ':db/id': -7,
      'componentsname': 'thirdaction',
      'componentsparents': -1,
      'componentstype': 'action',
      'componentsfunction': `({conn, transact}, e) {
        var date = new Date().getTime()
        transact(conn, [{
          ':db/id': -1,
          description: 'thirdaction test',
          date: date,
          status: 'pending',
          uuid: 'uuid-' + date
        }])
      }`
    },
    {
      ':db/id': -8,
      'componentsname': 'Third Data Component',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -9,
      'componentsname': 'fourthaction',
      'componentsparents': [-5, -18],
      'componentstype': 'action',
      'componentsfunction': `({conn, transact}, e) {
        var date = new Date().getTime()
        transact(conn, [{
          ':db/id': -1,
          description: 'fourthaction test',
          date: date,
          status: 'pending',
          uuid: 'uuid-' + date
        }])
      }`
    },
    {
      ':db/id': -10,
      'componentsname': 'Fourth Data Component',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -11,
      'componentsname': 'killthestate',
      'componentsparents': [-5, -18],
      'componentstype': 'action',
      'componentsfunction': `({conn, transact}, e) {
        var date = new Date().getTime()
        transact(conn, [{
          ':db/id': -1,
          alert: 'dostuff_happened',
          description: 'fifthaction test',
          date: date,
          status: 'pending',
          uuid: 'uuid-' + date
        }])
      }`
    },
    {
      ':db/id': -12,
      'componentsname': 'Fifth Data Component (fourth in the main)',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
     { ':db/id': -13,
      componentid: 'newrootcomponentcleanup',
      componentsname: 'New Root component (cleanup)',
      query: `[:find ?desc ?date ?status ?uuid
               :where [?u "description" ?desc]
                      [?u "date" ?date]
                      [?u "status" ?status]
                      [?u "uuid" ?uuid]]`,
      sortfields: `[2, 0]`,
      sortorders: `[DESC, ASC]`
    },
    { ':db/id': -14,
      actionsetid: 'general',
      modulename: 'General actions',
      moduleactions: [-16, -2, -9, -11]
    },
    { ':db/id': -15,
      routeid: 'home',
      modulename: 'Core module'
    },
    { ':db/id': -16,
      componentsname: 'keyupaddtask',
      componentstype: 'action',
      componentsfunction: `({conn, transact}, e) {
        if (e.which === 13) {
          var date = new Date().getTime()
          transact(conn, [{
            ':db/id': -1,
            description: 'keyup addtask test',
            date: date,
            status: 'pending',
            uuid: 'uuid-' + date
          }])
        }
      }`
    },
    { ':db/id': -17,
      moduleid: 'newrootcore',
      modulename: 'Root Core module',
      moduleactionsets: -14,
      rootcomponent: -13,
      routes: -15
    },
  ]

export default componentdatoms
