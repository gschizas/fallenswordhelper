import calf from '../../support/calf';
import {createTFoot} from '../../common/cElement';
import getElementsByClassName from '../../common/getElementsByClassName';
import getElementsByTagName from '../../common/getElementsByTagName';
import getMembrList from '../../ajax/getMembrList';
import injectAdvisorWeekly from './injectAdvisorWeekly';
import insertElement from '../../common/insertElement';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import {injectTable, playerLevel, playerName, playerRank} from './helpers';
import {time, timeEnd} from '../../support/debug';

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
    return cell.textContent.trim();
  }
  return cell.textContent;
}

function bodyText(membrList, row) {
  var foo = Array.from(row.cells, cellText);
  foo.splice(0, 1, playerName(foo[0], membrList),
    playerLevel(foo[0], membrList), playerRank(foo[0], membrList));
  return foo;
}

function getData(list, membrList) {
  return Array.from(list.rows).slice(1, -1)
    .map(partial(bodyText, membrList));
}

function summaryLink() {
  var updateInput = getElementsByClassName('custombutton', pCC);
  if (updateInput.length === 0) {return;}
  insertHtmlAfterEnd(updateInput[0], '<span> <a href="index.php' +
    '?cmd=guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>');
}

function injectAdvisorDaily(list, membrList) {

  time('guildAdvisor.injectAdvisorDaily');

  var data = getData(list, membrList);
  var tfoot = getTfoot(list);
  injectTable(list, tfoot, data);
  summaryLink();

  timeEnd('guildAdvisor.injectAdvisorDaily');

}

function switcher(list) {
  if (calf.subcmd2 === 'weekly') {
    injectAdvisorWeekly(list);
  } else {
    getMembrList(false).done(function(response) {
      injectAdvisorDaily(list, response);
    });
  }
}

export default function injectAdvisor() {
  if (jQueryNotPresent()) {return;}
  var list = getElementsByTagName('table', pCC)[1];
  if (!list) {return;}
  switcher(list);
}
