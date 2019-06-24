import indexAjaxJson from '../ajax/indexAjaxJson';

function updateType(item) {
  item.a = Number(item.a);
  item.b = Number(item.b);
  item.l = Number(item.l);
  if (item.extra) {
    item.n = item.extra.name;
  }
  item.t = Number(item.t);
  return item;
}

function formatResponse(json) {
  return {r: json.map(updateType), s: true};
}

export default function guildFetchInv() {
  return indexAjaxJson({
    cmd: 'guild',
    subcmd: 'fetchinv'
  }).then(formatResponse);
}
