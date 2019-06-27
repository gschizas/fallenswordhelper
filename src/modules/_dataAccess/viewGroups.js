import createDocument from '../system/createDocument';
import indexAjaxData from '../ajax/indexAjaxData';
import playerName from '../common/playerName';
import querySelector from '../common/querySelector';

function parseReport(html) {
  const doc = createDocument(html);
  const disband = querySelector('#pCC img[src$="disband.gif"]', doc);
  if (!disband) {return {};}
  const id = Number(disband.parentNode.href.match(/\((\d+)\)/)[1]);
  return {r: [{id: id, members: [{name: playerName()}]}]};
}

// Incomplete
export default function viewGroups() {
  return indexAjaxData({cmd: 'guild', subcmd: 'groups'}).then(parseReport);
}
