import allChecks from './allChecks';
import changeLvls from './changeLvls';
import clearChecks from './clearChecks';
import doAction from './doAction';
import dropItem from '../../ajax/dropItem';
import equipItem from '../../ajax/equipItem';
import getChecks from './getChecks';
import moveItem from '../../ajax/moveItem';
import partial from '../../common/partial';
import resetChecks from './resetChecks';
import resetLvls from './resetLvls';
import sendItem from '../../ajax/sendItem';
import storeItems from '../../ajax/storeItems';
import useItem from '../../ajax/useItem';
import {queueRecallItem, queueTakeItem} from '../../ajaxQueue/queue';

function setName(e) { // jQuery
  $('#fshInv').DataTable().search($(e.target).attr('set')).draw();
  $('#fshInv_filter input').focus();
}

function takeItem(e) { // jQuery
  var self = $(e.target);
  doAction(
    partial(queueTakeItem, self.attr('invid'), self.attr('action')),
    self
  );
}

function recallItem(e) { // jQuery
  var self = $(e.target);
  doAction(
    partial(queueRecallItem, {
      invId: self.attr('invid'),
      playerId: self.attr('playerid'),
      mode: self.attr('mode'),
      action: self.attr('action')
    }),
    self
  );
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
  doAction(partial(sendItem, [self.data('inv')]), self);
}

export default function eventHandlers() { // jQuery
  // $('#fshRefresh').click(injectInventoryManagerNew);
  $('#fshMinLvl, #fshMaxLvl').keyup(changeLvls);
  $('#fshReset').click(resetLvls);
  $('table.fshInvFilter').on('click', 'input[type="checkbox"]', getChecks);
  $('#fshAll').click(allChecks);
  $('#fshNone').click(clearChecks);
  $('#fshDefault').click(resetChecks);
  $('#fshInv').on('click', 'span.setName', setName);
  $('#fshInv').on('click', 'span.takeItem', takeItem);
  $('#fshInv').on('click', 'span.recallItem', recallItem);
  $('#fshInv').on('click', 'span.wearItem', wearItem);
  $('#fshInv').on('click', 'span.useItem', doUseItem);
  $('#fshInv').on('change', 'select.fshMoveItem', doMoveItem);
  $('#fshInv').on('click', 'span.dropItem', doDropItem);
  $('#fshInv').on('click', 'span.sendItem', doSendItem);
  $('#fshInv').on('click', 'span.storeItem', doStoreItem);
}
