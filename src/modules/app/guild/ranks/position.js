import ranks from './ranks';

export default function rankPosition(direction, rankId) {
  return ranks({subcmd2: direction, rank_id: rankId});
}
