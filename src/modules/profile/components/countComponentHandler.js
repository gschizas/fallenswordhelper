import {imageServer} from '../../system/system';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import insertTextBeforeEnd from '../../common/insertTextBeforeEnd';
import loadComponents from '../../app/profile/loadcomponents';
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

function makeTotalRow(tbl, data) {
  var totRow = tbl.insertRow(-1);
  insertHtmlBeforeEnd(totRow, '<td>Total:</td>');
  var totCell = totRow.insertCell(-1);
  totCell.colSpan = 2;
  var usedCount = data.r.length;
  var totalCount = data.h.cm;
  var usedCountDom = createSpan();
  usedCountDom.innerHTML = usedCount.toString();
  insertElement(totCell, usedCountDom);
  insertTextBeforeEnd(totCell, ' / ' + totalCount.toString());
}

function makeTallyTable(data) {
  var tbl = createTable({className: 'fshTblCenter', id: 'fshTally'});
  insertElement(tbl, makeTallyTbody(data));
  makeTotalRow(tbl, data);
  return tbl;
}

function displayComponentTally(self, data) {
  if (!Array.isArray(data.r)) {return;}
  var sumComp = self.parentNode;
  if (sumComp) {
    sumComp.innerHTML = '';
    insertElement(sumComp, makeTallyTable(data));
  }
}

function countComponent(self) { // jQuery.min
  sendEvent('components', 'countComponent');
  loadComponents().done(partial(displayComponentTally, self));
}

export default function countComponentHandler(evt) {
  if (evt.target.classList.contains('count-components')) {
    countComponent(evt.target);
    return true;
  }
}
