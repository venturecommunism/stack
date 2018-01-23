  /**
   * Define some query data.
   */


// should check if single quotes on field names are needed
  const componentdatoms = [
    { ':db/id': -1,
      'moduleid': 'createtask',
      'modulename': 'Create task',
      'moduleactionsets': -3,
      'rootcomponent': -2
    },
    { ':db/id': -2,
      'componentsname': 'Create task Root component',
      'componentstype': 'root',
      'componentid': 'createtask',
    },
    { ':db/id': -3,
      actionsetid: 'createtaskactions',
      modulename: 'Create task actions',
      moduleactions: -5
    },
    {
      ':db/id': -4,
      'componentsname': 'textareatocreatetask',
      'componentsparents': -2,
      'componentstype': 'textarea',
      'placeholder': "Enter your task content."
    },
    {
      ':db/id': -5,
      'componentsname': 'Add_New',
      'componentsparents': -2,
      'componentstype': 'action',
      'componentsfunction': `({conn, transact}, text) {
        var date = new Date().getTime()
        transact(conn, [{
          ':db/id': -1,
          description: text,
          date: date,
          status: 'pending',
          uuid: 'uuid-' + date
        }])
      }`
    },
    {
      ':db/id': -6,
      'componentsname': 'Subcomponent',
      'componentsparents': -2,
      'componentstype': 'subcomponent'
    },
  ]

export default componentdatoms
