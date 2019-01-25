import allChecks from './allChecks';
import changeLvls from './changeLvls';
import clearChecks from './clearChecks';
import doAction from './doAction';
import dropItem from '../../../ajax/dropItem';
import equipItem from '../../../ajax/equipItem';
import getChecks from './getChecks';
import moveItem from '../../../ajax/moveItem';
import partial from '../../../common/partial';
import resetChecks from './resetChecks';
import resetLvls from './resetLvls';
import senditems from '../../../app/trade/senditems';
import storeItems from '../../../ajax/storeItems';
import useItem from '../../../ajax/useItem';
import {queueRecallItem, queueTakeItem} from '../../../ajaxQueue/queue';

function setName(fshInv, e) { // jQuery
  $(fshInv).DataTable().search($(e.target).attr('set')).draw();
  $('#' + fshInv.id + '_filter input').focus();
}

function takeItem(e) { // jQuery
  var self = $(e.target);
  doAction(partial(queueTakeItem, self.attr('invid'), self.attr('action')),
    self);
}

function recallItem(e) { // jQuery
  var self = $(e.target);
  doAction(partial(queueRecallItem, self.attr('invid'), self.attr('playerid'),
    self.attr('mode'), self.attr('action')), self);
}

function wearItem(e) { // jQuery
  var self = $(e.target);
  doAction(partial(equipItem, self.attr('invid')), self);
}

function doUseItem(e) { // jQuery
  var self = $(e.target);
  doAction(partial(useItem, self.attr('invid')), self);
}

function doMoveItem(e) { // jQuery
  var self = $(e.target);
  moveItem([self.data('inv')], self.val());
}

function doStoreItem(e) { // jQuery
  var self = $(e.target);
  doAction(partial(storeItems, [self.attr('invid')]), self);
}

function doDropItem(e) { // jQuery
  var self = $(e.target);
  doAction(partial(dropItem, [self.data('inv')]), self);
}

function doSendItem(e) { // jQuery
  var self = $(e.target);
  doAction(partial(senditems, [self.data('inv')]), self);
}

function elementClickHandlers(fshInv) {
  [
    ['#fshReset', resetLvls],
    ['#fshAll', allChecks],
    ['#fshNone', clearChecks],
    ['#fshDefault', resetChecks]
  ].forEach(function(el) {$(el[0]).click(partial(el[1], fshInv));});
}

function spanClickHandlers(fshInv) {
  [
    ['setName', partial(setName, fshInv)],
    ['takeItem', takeItem],
    ['recallItem', recallItem],
    ['wearItem', wearItem],
    ['useItem', doUseItem],
    ['dropItem', doDropItem],
    ['sendItem', doSendItem],
    ['storeItem', doStoreItem]
  ].forEach(function(el) {$(fshInv).on('click', 'span.' + el[0], el[1]);});
}

function setupClickHandlers(fshInv) {
  elementClickHandlers(fshInv);
  $('table.fshInvFilter').on('click', 'input[type="checkbox"]',
    partial(getChecks, fshInv));
  spanClickHandlers(fshInv);
}

export default function eventHandlers(fshInv) { // jQuery
  $('#fshMinLvl, #fshMaxLvl').keyup(partial(changeLvls, fshInv));
  $(fshInv).on('change', 'select.fshMoveItem', doMoveItem);
  setupClickHandlers(fshInv);
}
