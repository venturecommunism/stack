  /**
   * Define some query data.
   */
  const datoms = [
    {
      ':db/id': -1,
      name: 'Reactive Test Query',
      query: `[:find ?e ?val
 :where [?e "db/doc"]
        [?e "db/doc" ?val]]`
    },
    {
      ':db/id': -2,
      name: 'Inbox',
      query: `[:find ?e ?entry ?id ?created ?username ?uuid ?desc ?ident ?status
 :where [?e "workflow" "/tw-ui/0.inbox"]
        [?e "entry" ?entry]
        [?e "id" ?id]
        [?e "created" ?created]
        [?e "username" ?username]
        [?e "uuid" ?uuid]
        [?e "description" ?desc]
        [?e "db:ident" ?ident]
        [?e "status" ?status]]`
    },
    {
      ':db/id': -3,
      name: 'Calendar',
      query: `[:find ?status ?uuid ?entry ?description ?due ?e
 :where [?e "status" ?status]
        [?e "uuid" ?uuid]
        [?e "entry" ?entry]
        [?e "description" ?description]
        [?e "due" ?due]]`
    },
    {
      ':db/id': -4,
      name: 'Contexts',
      query: `[:find ?e ?context ?desc ?type
 :where [?e "context"]
        [?e "description" ?desc]
        [?e "type" ?type]
        [?e "context" ?context]]`
    },
    {
      ':db/id': -5,
      name: 'Areas of Responsibility',
      query: `[:find ?e ?desc
 :where [?e "description" ?desc]
        [?e "tags" "aor"]]`
    },
  ]

export default datoms
