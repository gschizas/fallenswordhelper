import arrayFrom from '../../common/arrayFrom';
import calf from '../../support/calf';
import { cmdUrl } from '../../support/constants';
import createTFoot from '../../common/cElement/createTFoot';
import getElementsByClassName from '../../common/getElementsByClassName';
import getElementsByTagName from '../../common/getElementsByTagName';
import getMembrList from '../../ajax/getMembrList';
import getText from '../../common/getText';
import getTextTrim from '../../common/getTextTrim';
import injectAdvisorWeekly from './injectAdvisorWeekly';
import insertElement from '../../common/insertElement';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import loadDataTables from '../../common/loadDataTables';
import { pCC } from '../../support/layout';
import partial from '../../common/partial';
import {
  injectTable, playerLevel, playerName, playerRank,
} from './helpers';
import { time, timeEnd } from '../../support/debug';

function getTfoot(list) {
  const totalRow = list.rows[list.rows.length - 1];
  const totalClone = totalRow.cloneNode(true);
  const tfoot = createTFoot();
  insertElement(tfoot, totalClone);
  const totalCell = totalClone.cells[0];
  totalCell.className = 'fshRight';
  totalCell.setAttribute('colspan', '3');
  return tfoot;
}

function cellText(cell, i) {
  if (i === 0) {
    return getTextTrim(cell);
  }
  return getText(cell);
}

function bodyText(membrList, row) {
  const foo = arrayFrom(row.cells, cellText);
  foo.splice(0, 1, playerName(foo[0], membrList),
    playerLevel(foo[0], membrList), playerRank(foo[0], membrList));
  return foo;
}

function getData(list, membrList) {
  return arrayFrom(list.rows).slice(1, -1)
    .map(partial(bodyText, membrList));
}

function summaryLink() {
  const updateInput = getElementsByClassName('custombutton', pCC);
  if (updateInput.length === 0) { return; }
  insertHtmlAfterEnd(updateInput[0], `<span> <a href="${cmdUrl
  }guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`);
}

function injectAdvisorDaily(list, membrList) {
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    time('guildAdvisor.injectAdvisorDaily');
  }
  const data = getData(list, membrList);
  const tfoot = getTfoot(list);
  injectTable(list, tfoot, data);
  summaryLink();
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    timeEnd('guildAdvisor.injectAdvisorDaily');
  }
}

function switcher(list) {
  if (calf.subcmd2 === 'weekly') {
    injectAdvisorWeekly(list);
  } else {
    getMembrList(false).then(partial(injectAdvisorDaily, list));
  }
}

export default function injectAdvisor() {
  if (jQueryNotPresent()) { return; }
  const list = getElementsByTagName('table', pCC)[1];
  if (!list) { return; }
  loadDataTables().then(() => switcher(list));
}
