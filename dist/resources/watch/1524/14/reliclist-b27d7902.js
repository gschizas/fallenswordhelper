import { w as indexAjaxData, b7 as getTextTrim, aJ as arrayFrom, bn as attribType, bJ as enhancementType, e as createDiv, am as isUndefined, S as querySelector, v as createDocument, C as setInnerHtml, p as pCC, av as guideUrl, au as defSubcmd, bK as guildViewUrl, u as partial, bL as splitTime, aN as padZ } from './calfSystem-43606e5e.js';
import { d as dataRows } from './dataRows-e87a3e05.js';
import './closest-90712ffa.js';
import { c as closestTable } from './closestTable-c8e351e9.js';
import './all-df45fbb2.js';
import { a as allthen } from './allthen-1113e879.js';

function guildReliclist(page) {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'reliclist',
    page,
  });
}

function parseTime(string) {
  const parts = string.match(/(\d+) days, (\d+) hours, (\d+) mins, (\d+) secs/);
  if (parts) {
    return Number(parts[1]) * 24 * 60 * 60
      + Number(parts[2]) * 60 * 60
      + Number(parts[3]) * 60
      + Number(parts[4]);
  }
}

function parseGuild(cell) {
  const a = cell.children[0].rows[0].cells[1].children[0];
  const id = a.href.match(/&guild_id=(\d+)/)[1];
  const name = getTextTrim(a);
  return { id, name };
}

function parseLocation(div) {
  const parts = getTextTrim(div).match(/(.*) \((\d+), (\d+)\)/);
  return {
    name: parts[1],
    x: Number(parts[2]),
    y: Number(parts[3]),
  };
}

function getTextNodes(div) {
  return arrayFrom(div.childNodes)
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .map(getTextTrim)
    .map((e) => e.split('\u00A0'));
}

function getAttribs(childNodes) {
  return childNodes.filter((e) => attribType.includes(e[1])).map((e) => ({
    id: attribType.indexOf(e[1]),
    is_percent: e[0].endsWith('%'),
    value: parseInt(e[0], 10),
  }));
}

function getEnhancements(childNodes) {
  return childNodes.filter((e) => enhancementType.includes(e[1])).map((e) => ({
    id: enhancementType.indexOf(e[1]),
    value: Number(e[0]),
  }));
}

function parseTip(tipped) {
  const div = createDiv({ innerHTML: tipped });
  const location = parseLocation(div.children[1]);
  const minLevel = Number(getTextTrim(div.children[2]).match(/(\d+)/)[1]);
  const childNodes = getTextNodes(div);
  const attributes = getAttribs(childNodes);
  const enhancements = getEnhancements(childNodes);
  return {
    attributes, enhancements, location, min_level: minLevel,
  };
}

function getBaseRelic(row) {
  const img = row.cells[0].children[0];
  const tipped = parseTip(img.dataset.tipped);
  return {
    attributes: tipped.attributes,
    enhancements: tipped.enhancements,
    id: Number(img.src.match(/\/(\d+)\.gif/)[1]),
    location: tipped.location,
    min_level: tipped.min_level,
    name: getTextTrim(row.cells[1].children[0]),
  };
}

function parseRelic(row) {
  const baseRelic = getBaseRelic(row);
  const time = parseTime(getTextTrim(row.cells[3]));
  if (!isUndefined(time)) {
    baseRelic.time = time;
    baseRelic.guild = parseGuild(row.cells[2]);
  }
  return baseRelic;
}

function parsePage(doc) {
  const firstHeader = querySelector('.header', doc);
  const thisTable = closestTable(firstHeader);
  return dataRows(thisTable.rows, 4, 0).map(parseRelic);
}

function processPages(ary) {
  const relics = ary.map(createDocument).map(parsePage);
  return [].concat(...relics);
}

function processPageOne(html) {
  const doc = createDocument(html);
  const select = querySelector('#pCC select[name="page"]', doc);
  const otherPages = arrayFrom(select.children)
    .map((o) => Number(o.value)).filter((v) => v !== 0);
  return allthen([html].concat(otherPages.map(guildReliclist)),
    processPages);
}

function getRelicList() {
  return guildReliclist(0).then(processPageOne);
}

function relicName(relic) {
  return `<a href="${guideUrl}relics${defSubcmd}view&relic_id=${relic.id}">`
    + `${relic.name}</a>`;
}

function guildName(relicGuild) {
  if (relicGuild) {
    return `<a href="${guildViewUrl}${relicGuild.id}">${relicGuild.name}</a>`;
  }
  return '';
}

function attrib(id, att) { return att.id === id; }

function stamGain(relic) {
  return relic.attributes && relic.attributes.find(partial(attrib, 6));
}

function makeAttrib(attribs, id) {
  if (attribs) {
    const thisAttrib = attribs.find(partial(attrib, id));
    if (thisAttrib) {
      return thisAttrib.value;
    }
  }
  return '';
}

function allAttribs(attribs) {
  return [6, 0, 4, 5, 7, 8].map(partial(makeAttrib, attribs)).join('</td><td>');
}

function formatTime(time) {
  if (!time) { return ''; }
  const t = splitTime(time);
  return `${padZ(t[0])}d ${padZ(t[1])}h ${padZ(t[2])}m ${padZ(t[3])}s`;
}

function makeRow(relic) {
  return `<tr><td>${relic.min_level}</td>`
    + `<td>${relicName(relic)}</td>`
    + `<td>${guildName(relic.guild)}</td>`
    + `<td>${allAttribs(relic.attributes)}</td>`
    + `<td>${formatTime(relic.time)}</td></tr>`;
}

function makeTable(thisRelicList) {
  return '<style>'
    + '#pCC .reliclist {border-collapse: collapse; border-spacing: 0;}'
    + '.reliclist, .reliclist th, .reliclist td {border: 1px solid black;}'
    + '.reliclist th, .reliclist td {padding: 5px;}'
    + '</style><table class="reliclist"><thead><tr>'
    + '<th>Level</th>'
    + '<th>Name</th>'
    + '<th>Guild</th>'
    + '<th>Stam<br>Gain</th>'
    + '<th>Atk</th>'
    + '<th>Dmg</th>'
    + '<th>Stam</th>'
    + '<th>Gold<br>Gain</th>'
    + '<th>XP<br>Gain</th>'
    + '<th>Time</th>'
    + `</tr></thead><tbody>${
      thisRelicList.filter(stamGain).map(makeRow).join('')
    }</tbody></table>`;
}

function processRelicList(thisRelicList) {
  thisRelicList.sort((a, b) => a.min_level - b.min_level);
  setInnerHtml(makeTable(thisRelicList), pCC);
}

function reliclist() {
  setInnerHtml('Loading...', pCC);
  getRelicList().then(processRelicList);
}

export default reliclist;
//# sourceMappingURL=reliclist-b27d7902.js.map
