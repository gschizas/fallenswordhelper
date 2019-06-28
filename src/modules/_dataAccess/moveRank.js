import indexAjaxData from '../ajax/indexAjaxData';

export default function moveRank(direction, rankId) {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'ranks',
    subcmd2: direction,
    rank_id: rankId
  }).then(() => ({s: true}));
}
