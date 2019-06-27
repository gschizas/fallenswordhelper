import {arrayFrom} from '../../common/arrayFrom';
import calf from '../../support/calf';
import {cmdUrl} from '../../support/constants';
import {createTFoot} from '../../common/cElement';
import getElementsByClassName from '../../common/getElementsByClassName';
import getElementsByTagName from '../../common/getElementsByTagName';
import getMembrList from '../../ajax/getMembrList';
import getText from '../../common/getText';
import getTextTrim from '../../common/getTextTrim';
import injectAdvisorWeekly from './injectAdvisorWeekly';
import insertElement from '../../common/insertElement';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import {injectTable, playerLevel, playerName, playerRank} from './helpers';
//#if _BETA  //  Timing output
import {time, timeEnd} from '../../support/debug';
//#endif

function getTfoot(list) {
  var totalRow = list.rows[list.rows.length - 1];
  var totalClone = totalRow.cloneNode(true);
  var tfoot = createTFoot();
  insertElement(tfoot, totalClone);
  var totalCell = totalClone.cells[0];
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
  var foo = arrayFrom(row.cells, cellText);
  foo.splice(0, 1, playerName(foo[0], membrList),
    playerLevel(foo[0], membrList), playerRank(foo[0], membrList));
  return foo;
}

function getData(list, membrList) {
  return arrayFrom(list.rows).slice(1, -1)
    .map(partial(bodyText, membrList));
}

function summaryLink() {
  var updateInput = getElementsByClassName('custombutton', pCC);
  if (updateInput.length === 0) {return;}
  insertHtmlAfterEnd(updateInput[0], '<span> <a href="' + cmdUrl +
    'guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>');
}

function injectAdvisorDaily(list, membrList) {
  //#if _BETA  //  Timing output

  time('guildAdvisor.injectAdvisorDaily');

  //#endif
  var data = getData(list, membrList);
  var tfoot = getTfoot(list);
  injectTable(list, tfoot, data);
  summaryLink();
  //#if _BETA  //  Timing output

  timeEnd('guildAdvisor.injectAdvisorDaily');

  //#endif
}

function switcher(list) {
  if (calf.subcmd2 === 'weekly') {
    injectAdvisorWeekly(list);
  } else {
    getMembrList(false).then(partial(injectAdvisorDaily, list));
  }
}

export default function injectAdvisor() {
  if (jQueryNotPresent()) {return;}
  var list = getElementsByTagName('table', pCC)[1];
  if (!list) {return;}
  switcher(list);
}
