import {arrayFrom} from '../common/arrayFrom';
import chunk from '../common/chunk';
import createDocument from '../system/createDocument';
import {dataRows} from '../common/dataRows';
import getTextTrim from '../common/getTextTrim';
import indexAjaxData from '../ajax/indexAjaxData';
import {months} from '../support/constants';
import {now} from '../support/now';
import querySelector from '../common/querySelector';

function parseDateAsTimestamp(textDate) {
  var dateAry = textDate.split(/[: /[]/);
  return new Date(Number(dateAry[4]), months.indexOf(dateAry[3]),
    Number(dateAry[2]), Number(dateAry[0]), Number(dateAry[1]));
}

function calcCd(e) {
  const cdText = getTextTrim(e[1]);
  if (cdText === 'No active cooldown') {return 0;}
  return Math.ceil(
    (parseDateAsTimestamp(cdText.slice(16)) - now) / 1000);
}

function creature(e) {
  const mobImg = e[0].cells[0].children[0];
  return {
    base_id: Number(mobImg.src.match(/s\/(\w+)\.p/)[1].slice(0, -32)),
    name: mobImg.title,
  };
}

function testTitan(e) {
  const ret = {
    cooldown: calcCd(e),
    creature: creature(e),
    kills: Number(getTextTrim(e[0].cells[3]))
  };
  const loc = getTextTrim(e[0].cells[1]);
  if (loc !== 'n/a') {
    ret.realm = loc;
    const kills = getTextTrim(e[0].cells[2]).match(/(\d+)\/(\d+)/);
    ret.current_hp = Number(kills[1]);
    ret.max_hp = Number(kills[2]);
  }
  ret.three = getTextTrim(e[2]);
  const contribs = e[2].cells[0].children;
  if (contribs.length === 1) {
    const thisRows = arrayFrom(contribs[0].rows).filter(dataRows(3, 0));
    ret.contributors = thisRows.map(r => ({
      kills: Number(getTextTrim(r.cells[1])),
      player: {name: getTextTrim(r.cells[0])}
    }));
  }
  return ret;
}

function parseReport(html) {
  const doc = createDocument(html);
  const titanTable = querySelector('table[width="500"]', doc);
  if (!titanTable) {return {s: false};}
  const thisRows = arrayFrom(titanTable.rows)
    .filter((e, i, a) => i !== 0 && i < a.length - 1 && (i - 1) % 6 < 3);
  const titans = chunk(3, thisRows);
  return {r: titans.map(testTitan), s: true};
}

// Incomplete
export default function scouttower() {
  return indexAjaxData({cmd: 'guild', subcmd: 'scouttower'}).then(parseReport);
}
