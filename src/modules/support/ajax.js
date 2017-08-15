import * as layout from './layout';

var deferred = window.$ && $.when();

export function dialog(data) {
  if (data.r === 0) {return;}
  $('#dialog_msg').html(data.m).dialog('open');
}

export function equipItem(backpackInvId) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'profile',
      subcmd: 'equipitem',
      inventory_id: backpackInvId,
      ajax: 1
    },
    dataType: 'json'
  }).done(dialog);
}

export function htmlResult(data) {
  var info = layout.infoBox(data);
  var _r = 1;
  if (info.search(/(successfully|gained|components)/) !== -1) {_r = 0;}
  return {r: _r, m: info};
}

export function useItem(backpackInvId) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'profile',
      subcmd: 'useitem',
      inventory_id: backpackInvId
    }
  }).pipe(htmlResult)
    .done(dialog);
}

function additionalAction(action, data) {
  if (action === 'wear') {
    return equipItem(data.b)
      .pipe(function equipItemStatus() {return data;});
    // Return takeitem status irrespective of the status of the equipitem
  }
  if (action === 'use') {
    return useItem(data.b)
      .pipe(function useItemStatus() {return data;});
    // Return takeitem status irrespective of the status of the useitem
  }
}

function takeItemStatus(action, data) {
  if (data.r === 0 && action !== 'take') {
    return additionalAction(action, data);
  }
  return data;
}

export function takeItem(invId) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'guild',
      subcmd: 'inventory',
      subcmd2: 'takeitem',
      guildstore_id: invId,
      ajax: 1
    },
    dataType: 'json'
  }).done(dialog);
}

export function queueTakeItem(invId, action) {
  // You have to chain them because they could be modifying the backpack
  deferred = deferred.pipe(function pipeTakeToQueue() {
    return takeItem(invId).pipe(takeItemStatus.bind(null, action));
  });
  return deferred;
}

function guildInvRecall(invId, playerId, mode) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'guild',
      subcmd: 'inventory',
      subcmd2: 'recall',
      id: invId,
      player_id: playerId,
      mode: mode
    }
  }).pipe(htmlResult)
    .done(dialog);
}

function backpack() {
  return $.ajax({
    url: 'index.php',
    data: {cmd: 'profile', subcmd: 'fetchinv'},
    dataType: 'json'
  });
}

function recallItem(o) {
  return guildInvRecall(o.invId, o.playerId, o.mode)
    .pipe(function recallItemStatus(data) {
      if (data.r === 0 && o.action !== 'recall') {
        return backpack().pipe(function gotBackpack(bpData) {
          // TODO assuming backpack is successful...
          if (o.action === 'wear') {
            return equipItem(bpData.items[bpData.items.length - 1].a)
              .pipe(function wearItemStatus() {return data;});
            // Return recall status irrespective of the status of the equipitem
          }
          if (o.action === 'use') {
            return useItem(
              bpData.items[bpData.items.length - 1].a)
              .pipe(function useItemStatus() {return data;});
            // Return recall status irrespective of the status of the useitem
          }
        });
      }
      return data;
    });
}

export function queueRecallItem(o) {
  // You have to chain them because they could be modifying the backpack
  deferred = deferred.pipe(function pipeRecallToQueue() {
    return recallItem(o);
  });
  return deferred;
}
