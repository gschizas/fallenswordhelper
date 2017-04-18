import calf from './calf';
import * as debug from './debug';
import * as layout from './layout';
import * as system from './system';

var deferred = window.$ && $.when();

export function getForage(forage) {
  // Wrap in jQuery Deferred because we're using 1.7
  // rather than using ES6 promise
  var dfr = $.Deferred();
  localforage.getItem(forage, function getItemCallback(err, data) {
    if (err) {
      debug.log(forage + ' forage error', err);
      dfr.reject(err);
    } else {
      // returns null if key does not exist
      dfr.resolve(data);
    }
  });
  return dfr.promise();
}

export function setForage(forage, data) {
  // Wrap in jQuery Deferred because we're using 1.7
  // rather than using ES6 promise
  localforage.setItem(forage, data, function setItemCallback(err) {
    if (err) {
      debug.log(forage + ' forage error', err);
    }
  });
}

export function getGuild(guildId) {
  return $.ajax({
    dataType: 'json',
    url: 'index.php',
    data: {
      cmd: 'export',
      subcmd: 'guild_members',
      guild_id: guildId
    }
  });
}

function getGuildMembers(guildId) {
  return getGuild(guildId).pipe(function membrListToHash(data) {
    var membrList = {};
    membrList[guildId] = {};
    membrList[guildId].lastUpdate = Date.now();
    data.forEach(function memberToObject(ele) {
      membrList[guildId][ele.username] = ele;
    });
    return membrList;
  });
}

export function addMembrListToForage(membrList) {
  getForage('fsh_membrList')
    .done(function saveMembrListInForage(data) {
      var oldMemList = data || {};
      setForage('fsh_membrList', $.extend(oldMemList, membrList));
    });
}

function getMembrListFromForage(guildId, membrList) {
  if (system.fallback(system.fallback(system.fallback(
      !membrList, !membrList[guildId]),
      !membrList[guildId].lastUpdate),
      membrList[guildId].lastUpdate < Date.now() - 300000)) {
    return getGuildMembers(guildId).done(addMembrListToForage);
  }
  return membrList;
}

function guildMembers(force, guildId) {
  if (force) {
    return getGuildMembers(guildId).done(addMembrListToForage);
  }
  return getForage('fsh_membrList')
    .pipe(getMembrListFromForage.bind(null, guildId));
}

function setHelperMembrList(guildId, membrList) {
  calf.membrList = membrList[guildId];
  return calf.membrList;
}

export function getMembrList(force) {
  var guildId = layout.guildId();
  return guildMembers(force, guildId)
    .pipe(setHelperMembrList.bind(null, guildId));
}

export function getInventory() {
  return $.ajax({
    dataType: 'json',
    url: 'index.php?cmd=export&subcmd=' + (calf.subcmd === 'guildinvmgr' ?
      'guild_store&inc_tagged=1' : 'inventory')
  });
}

function rekeyInventory(data) {
  data.items = data.items.reduce(function(prev, curr) {
    if (curr.is_in_st) {prev.fshHasST = true;}
    prev[curr.inv_id] = curr;
    return prev;
  }, {});
  return data;
}

export function getInventoryById() {
  return getInventory().pipe(rekeyInventory);
}

function addLastUpdateDate(data) {
  data.lastUpdate = Date.now();
  return data;
}

export function getProfile(username) {
  return $.getJSON('index.php', {
    cmd: 'export',
    subcmd: 'profile',
    player_username: username
  });
}

function sendMyProfileToForage(data) {
  setForage('fsh_selfProfile', data);
}

function getMyProfile() {
  return getProfile(layout.playerName())
    .pipe(addLastUpdateDate)
    .done(sendMyProfileToForage);
}

function getProfileFromForage(data) {
  if (!data || data.lastUpdate < Date.now() -
    calf.allyEnemyOnlineRefreshTime) {
    return getMyProfile();
  }
  return data;
}

export function myStats(force) {
  if (force) {return getMyProfile();}
  // jQuery 1.7 uses pipe instead of then
  return getForage('fsh_selfProfile')
    .pipe(getProfileFromForage);
}

function dialog(data) {
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

function htmlResult(data) {
  var info = layout.infoBox(data);
  return info.search(/(successfully|gained|components)/) !== -1 ?
    {r: 0, m: info} : {r: 1, m: info};
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

function takeItem(invId, action) {
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
  }).done(dialog).pipe(function takeItemStatus(data) {
    if (data.r === 0 && action !== 'take') {
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
    return data;
  });
}

export function queueTakeItem(invId, action) {
  // You have to chain them because they could be modifying the backpack
  deferred = deferred.pipe(function pipeTakeToQueue() {
    return takeItem(invId, action);
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

export function backpack() {
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

export function guildMailboxTake(href) {
  return $.ajax({url: href}).pipe(function translateReturnInfo(data) {
    var info = layout.infoBox(data);
    return info === 'Item was transferred to the guild store!' ?
      {r: 0, m: ''} : {r: 1, m: info};
  }).done(dialog);
}

export function moveItem(invIdList, folderId) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'profile',
      subcmd: 'sendtofolder',
      inv_list: JSON.stringify(invIdList),
      folder_id: folderId,
      ajax: 1
    },
    dataType: 'json'
  }).done(dialog);
}

export function dropItem(invIdList) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'profile',
      subcmd: 'dodropitems',
      removeIndex: invIdList,
      ajax: 1
    },
    dataType: 'json'
  }).done(dialog);
}

export function sendItem(invIdList) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'trade',
      subcmd: 'senditems',
      xc: window.ajaxXC,
      target_username: system.getValue('itemRecipient'),
      sendItemList: invIdList
    }
  }).pipe(htmlResult)
    .done(dialog);
}

export function debuff(buffId) {
  return $.ajax({
    url: 'fetchdata.php',
    data: {
      a: '22',
      d: '0',
      id: buffId
    },
    dataType: 'json'
  });
}

export function doPickMove(moveId, slotId) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'arena',
      subcmd: 'dopickmove',
      move_id: moveId,
      slot_id: slotId
    }
  });
}
