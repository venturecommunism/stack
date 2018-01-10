  /**
   * Define some query data.
   */

  const componentdatoms = [
    {
      ':db/id': -1,
      'componentsname': 'Subcomponent',
      'componentsparents': [-5, -20],
      'componentstype': 'subcomponent'
    },
    {
      ':db/id': -2,
      'componentsname': 'multipleplaces',
      'componentsparents': [-1, -5, -20],
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
        e.target.value = ""
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
        e.target.value = ""
      }`
    },
    {
      ':db/id': -4,
      'componentsname': 'Data Component',
      'componentsparents': [-5, -20],
      'componentstype': 'data'
    },
    {
      ':db/id': -5,
      'componentsname': 'Root',
      'componentstype': 'root',
      'componentid': 'core'
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
        e.target.value = ""
      }`
    },
    {
      ':db/id': -8,
      'componentsname': 'Third Data Component',
      'componentsparents': [-5, -20],
      'componentstype': 'data'
    },
    {
      ':db/id': -9,
      'componentsname': 'fourthaction',
      'componentsparents': [-5, -20],
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
        e.target.value = ""
      }`
    },
    {
      ':db/id': -10,
      'componentsname': 'Fourth Data Component',
      'componentsparents': [-5, -20],
      'componentstype': 'data'
    },
    {
      ':db/id': -11,
      'componentsname': 'fifthaction',
      'componentsparents': [-5, -20],
      'componentstype': 'action',
      'componentsfunction': `({conn, transact}, e) {
        var date = new Date().getTime()
        transact(conn, [{
          ':db/id': -1,
          description: 'fifthaction test',
          date: date,
          status: 'pending',
          uuid: 'uuid-' + date
        }])
        e.target.value = ""
      }`
    },
    {
      ':db/id': -12,
      'componentsname': 'Fifth Data Component (fourth in the main)',
      'componentsparents': [-5, -20],
      'componentstype': 'data'
    },
    { ':db/id': -13,
      componentid: 'rootcomponentcleanup',
      componentsname: 'Root component (cleanup)',
      query: `[:find ?desc ?date ?status ?uuid
               :where [?u "description" ?desc]
                      [?u "date" ?date]
                      [?u "status" ?status]
                      [?u "uuid" ?uuid]]`,
      sortfields: `[2, 0]`,
      sortorders: `[DESC, ASC]`
    },
    { ':db/id': -14,
      componentid: 'rootcomponentcleanup_serverversion',
      componentsname: 'Root component (with a query that works for Server)',
      query: `[:find ?u ?u ?u ?desc
               :where [?u ?attrib ?desc]]`,
      sortfields: `[2, 0]`,
      sortorders: `[DESC, ASC]`
    },
    { ':db/id': -15,
      moduleid: 'core',
      modulename: 'Core module',
      moduleactionsets: -16,
      rootcomponent: -13,
      routes: -17
    },
    { ':db/id': -16,
      actionsetid: 'general',
      modulename: 'General actions',
      moduleactions: [-18, -2, -9, -11]
    },
    { ':db/id': -17,
      routeid: 'home',
      modulename: 'Core module'
    },
    { ':db/id': -18,
      componentsname: 'keyupaddtask',
      componentstype: 'action',
      componentsfunction: `({conn, transact}, e) {
        if (e.which === 13) {
          var date = new Date().getTime()
          transact(conn, [{
            ':db/id': -1,
            description: e.target.value,
            date: date,
            status: 'pending',
            uuid: 'uuid-' + date
          }])
          e.target.value = ""
        }
      }`
    },
    { ':db/id': -19,
      moduleid: 'servercore',
      modulename: 'Core module (server version)',
      moduleactionsets: -16,
      rootcomponent: -14,
      routes: -17
    },
    {
      ':db/id': -20,
      'componentsname': 'Server Root',
      'componentstype': 'root',
      'componentid': 'servercore'
    },
  ]

export default componentdatoms
