import { parse } from './edn'

export default function parseQueryAttributes (query) {
  const parsedQuery = parse(query.trim())
  const whereKeywordIndex = parsedQuery.indexOf(Symbol.for(':where'))
  const whereClauses = parsedQuery.slice(whereKeywordIndex + 1)

  // TODO:  Get this to work with rules + not/or/or-join + expression
  // clauses...  Also figure out different parse rules for pull syntax
  return whereClauses
    .reduce((attrMap, attr) => Object.assign(attrMap, { [attr]: true }), {})
}
