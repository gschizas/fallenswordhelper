import addCommas from '../../system/addCommas';
import guildView from '../../app/guild/view';
import insertElement from '../../common/insertElement';
import lastActivityToDays from '../../common/lastActivityToDays';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import report from '../../app/guild/inventory/report';
import {createStyle, createTBody, createTable} from '../../common/cElement';

const thisStyle = `
#pCC .whosGotWhat {
  border: 1px solid black;
  border-collapse: collapse;
  border-spacing: 0;
}
.whosGotWhat tr:nth-child(odd) {background: wheat;}
.whosGotWhat tr:nth-child(even) {background: burlywood;}
.whosGotWhat tr:hover {background: cornsilk;}
.whosGotWhat th, .whosGotWhat td {padding: 2px;}
.whosGotWhat th:nth-child(2), .whosGotWhat td:nth-child(2),
.whosGotWhat th:nth-child(4), .whosGotWhat td:nth-child(4),
.whosGotWhat th:nth-child(5), .whosGotWhat td:nth-child(5),
.whosGotWhat th:nth-child(6), .whosGotWhat td:nth-child(6) {text-align: right;}
`;

function byType(prev, curr) {
  if ([10, 15].includes(curr.t)) {
    prev[curr.player.name] = prev[curr.player.name] || [];
    prev[curr.player.name].push(curr);
  }
  return prev;
}

function addRank(rank_name, thisMember) {
  thisMember.rank_name = rank_name;
  return thisMember;
}

function extractMembers(thisRank) {
  return thisRank.members.map(partial(addRank, thisRank.name));
}

function processGuild(guild) {
  return [].concat(...guild.r.ranks.map(extractMembers));
}

function rowFactory(pots, domTBody, obj) {
  // var thisPots = (pots[obj.name] || []).length;
  domTBody.innerHTML += `<tr>
      <td>
        ${obj.name}
      </td>
      <td>${obj.level}</td>
      <td>${obj.rank_name}</td>
      <td>${addCommas(obj.guild_xp)}</td>
      <td>${lastActivityToDays(obj.last_activity)}</td>
      <td>${(pots[obj.name] || []).length}</td>
    </tr>`;
}

function showMe([json, guild]) {
  const members = processGuild(guild);
  const pots = json.r.reduce(byType, {});
  pCC.innerHTML = '';
  insertElement(pCC, createStyle(thisStyle));
  var domTable = insertElement(pCC, createTable({className: 'whosGotWhat'}));
  var domTBody = insertElement(domTable, createTBody());
  members.forEach(partial(rowFactory, pots, domTBody));
}

export default function whosGotWhat() {
  Promise.all([report(), guildView()]).then(showMe);
}
