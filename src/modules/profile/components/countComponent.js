import {daComponents} from '../../_dataAccess/_dataAccess';
import {imageServer} from '../../system/system';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import insertTextBeforeEnd from '../../common/insertTextBeforeEnd';
import {isArray} from '../../common/isArray';
import partial from '../../common/partial';
import playerId from '../../common/playerId';
import {sendEvent} from '../../support/fshGa';
import {componentList, prepareComponentList} from './prepareComponentList';
import {createSpan, createTBody, createTable} from '../../common/cElement';

function tallyTableRow(prev, comp) {
  return prev + '<tr><td><img src="' + imageServer + '/items/' + comp.b +
    '.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?' +
    'item_id=' + comp.b + '&inv_id=' + comp.a + '&t=2&p=' + playerId() +
    '&vcode=' + comp.v + '"></td><td>' + comp.count +
    '</td><td>[<span class="sendLink compDelType" data-compid="' + comp.b +
    '">Del</span>]</td></tr>';
}

function makeTallyTbody(data) {
  var tBody = createTBody();
  prepareComponentList(data);
  insertHtmlBeforeEnd(tBody,
    '<tr><td colspan="3">Component Summary</td></tr>' +
    Object.values(componentList).reduce(tallyTableRow, ''));
  return tBody;
}

function makeTotalCell(tbl) {
  var totRow = tbl.insertRow(-1);
  insertHtmlBeforeEnd(totRow, '<td>Total:</td>');
  var totCell = totRow.insertCell(-1);
  totCell.colSpan = 2;
  return totCell;
}

function makeUsedCount(data) {
  var usedCount = data.r.length;
  var usedCountDom = createSpan();
  usedCountDom.innerHTML = usedCount.toString();
  return usedCountDom;
}

function makeTotalRow(tbl, data) {
  var totCell = makeTotalCell(tbl);
  insertElement(totCell, makeUsedCount(data));
  insertTextBeforeEnd(totCell, ' / ' + data.h.cm.toString());
}

function makeTallyTable(data) {
  var tbl = createTable({className: 'fshTblCenter', id: 'fshTally'});
  insertElement(tbl, makeTallyTbody(data));
  makeTotalRow(tbl, data);
  return tbl;
}

function displayComponentTally(self, data) {
  if (!isArray(data.r)) {return;}
  var sumComp = self.parentNode;
  if (sumComp) {
    sumComp.innerHTML = '';
    insertElement(sumComp, makeTallyTable(data));
  }
}

export default function countComponent(self) { // jQuery.min
  sendEvent('components', 'countComponent');
  daComponents().then(partial(displayComponentTally, self));
}
