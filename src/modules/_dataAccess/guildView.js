import createDocument from '../system/createDocument';
import {dataRows} from '../common/dataRows';
import {getElementById} from '../common/getElement';
import getElementsByTagName from '../common/getElementsByTagName';
import getTextTrim from '../common/getTextTrim';
import indexAjaxData from '../ajax/indexAjaxData';
import intValue from '../system/intValue';
import {nowSecs} from '../support/now';
import {def_table, lastActivityRE, playerIDRE} from '../support/constants';

let cache = {};

function lastActivity(tipped) {
  const activity = tipped.match(lastActivityRE);
  return nowSecs - (
    Number(activity[1]) * 24 * 60 * 60 +
    Number(activity[2]) * 60 * 60 +
    Number(activity[3]) * 60 +
    Number(activity[4])
  );
}

function fromTip(row) {
  const tipped = row.cells[1].children[0].dataset.tipped;
  const stamina = tipped.match(/Stamina:<\/td><td>(\d+) \/ (\d+)</);
  return {
    current_stamina: Number(stamina[1]),
    max_stamina: Number(stamina[2]),
    vl: Number(tipped.match(/VL:<\/td><td>(\d+)</)[1]),
    last_activity: lastActivity(tipped)
  };
}

function fromRow(row) {
  return {
    id: Number(row.cells[1].children[0].href.match(playerIDRE)[1]),
    name: getTextTrim(row.cells[1].children[0]),
    level: Number(getTextTrim(row.cells[2])),
    xp: 0,
    guild_xp: intValue(getTextTrim(row.cells[4])),
    rank_name: getTextTrim(row.cells[3])
  };
}

function formatRow(row, i) {
  return Object.assign({rank_index: i}, fromTip(row), fromRow(row));
}

function byRank(prev, member) {
  const thisRankName = member.rank_name;
  const thisRankIndex = member.rank_index;
  const thisRankObj = prev.find(e => e.name === thisRankName);
  if (thisRankObj) {
    thisRankObj.members.push(member);
  } else {
    prev.push({id: thisRankIndex, name: thisRankName, members: [member]});
  }
  return prev;
}

function rankData(memberList) {
  const memberRows = dataRows(memberList.rows, 5, 1);
  const memberData = memberRows.map(formatRow);
  return memberData.reduce(byRank, []);
}

function parseReport(html) {
  const doc = createDocument(html);
  const pCC = getElementById('pCC', doc);
  const tables = getElementsByTagName(def_table, pCC);
  const memberList = tables[tables.length - 1];
  if (memberList) {return {r: {ranks: rankData(memberList)}, s: true};}
  return {s: false};
}

// Incomplete
export default function guildView(guildId) {
  if (!cache[guildId]) {
    cache[guildId] = indexAjaxData({
      cmd: 'guild',
      subcmd: 'view',
      guild_id: guildId
    }).then(parseReport);
  }
  return cache[guildId];
}
