import allthen from '../../common/allthen';
import {arrayFrom} from '../../common/arrayFrom';
import {closestTable} from '../../common/closest';
import {createDiv} from '../../common/cElement';
import createDocument from '../../system/createDocument';
import {dataRows} from '../../common/dataRows';
import getTextTrim from '../../common/getTextTrim';
import indexAjaxData from '../../ajax/indexAjaxData';
import isUndefined from '../../common/isUndefined';
import querySelector from '../../common/querySelector';
import {attribType, enhancementType} from '../../support/constants';

function guildReliclist(page) {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'reliclist',
    page
  });
}

function parseTime(string) {
  const parts = string.match(/(\d+) days, (\d+) hours, (\d+) mins, (\d+) secs/);
  if (parts) {
    return Number(parts[1]) * 24 * 60 * 60 +
      Number(parts[2]) * 60 * 60 +
      Number(parts[3]) * 60 +
      Number(parts[4]);
  }
}

function parseGuild(cell) {
  const a = cell.children[0].rows[0].cells[1].children[0];
  const id = a.href.match(/&guild_id=(\d+)/)[1];
  const name = getTextTrim(a);
  return {id, name};
}

function parseLocation(div) {
  const parts = getTextTrim(div).match(/(.*) \((\d+), (\d+)\)/);
  return {
    name: parts[1],
    x: Number(parts[2]),
    y: Number(parts[3])
  };
}

function getTextNodes(div) {
  return arrayFrom(div.childNodes)
    .filter(n => n.nodeType === Node.TEXT_NODE)
    .map(getTextTrim)
    .map(e => e.split('\u00A0'));
}

function getAttribs(childNodes) {
  return childNodes.filter(e => attribType.includes(e[1])).map(e => ({
    id: attribType.indexOf(e[1]),
    is_percent: e[0].endsWith('%'),
    value: parseInt(e[0], 10)
  }));
}

function getEnhancements(childNodes) {
  return childNodes.filter(e => enhancementType.includes(e[1])).map(e => ({
    id: enhancementType.indexOf(e[1]),
    value: Number(e[0])
  }));
}

function parseTip(tipped) {
  const div = createDiv({innerHTML: tipped});
  const location = parseLocation(div.children[1]);
  const min_level = Number(getTextTrim(div.children[2]).match(/(\d+)/)[1]);
  const childNodes = getTextNodes(div);
  const attributes = getAttribs(childNodes);
  const enhancements = getEnhancements(childNodes);
  return {attributes, enhancements, location, min_level};
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
    name: getTextTrim(row.cells[1].children[0])
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
  const thisRows = arrayFrom(thisTable.rows).filter(dataRows(4, 0));
  return thisRows.map(parseRelic);
}

function processPages(ary) {
  const relics = ary.map(createDocument).map(parsePage);
  return [].concat(...relics);
}

function processPageOne(html) {
  const doc = createDocument(html);
  const select = querySelector('#pCC select[name="page"]', doc);
  const otherPages = arrayFrom(select.children)
    .map(o => Number(o.value)).filter(v => v !== 0);
  return allthen([html].concat(otherPages.map(guildReliclist)),
    processPages);
}

export default function getRelicList() {
  return guildReliclist(0).then(processPageOne);
}
