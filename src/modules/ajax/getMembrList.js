import calf from '../support/calf';
import getForage from './getForage';
import {now} from '../support/dataObj';
import retryAjax from './retryAjax';
import setForage from './setForage';

function currentGuildId() {
  var _guildId;
  var nodeList = document.body.getElementsByTagName('script');
  Array.prototype.forEach.call(nodeList, function getGuildId(el) {
    var match = el.textContent.match(/\s+guildId: ([0-9]+),/);
    if (match) {_guildId = parseInt(match[1], 10);}
  });
  return _guildId;
}

function getGuild(guildId) {
  return retryAjax({
    dataType: 'json',
    url: 'index.php',
    data: {
      cmd: 'export',
      subcmd: 'guild_members',
      guild_id: guildId
    }
  });
}

function addMembrListToForage(membrList) {
  getForage('fsh_membrList')
    .done(function saveMembrListInForage(data) {
      var oldMemList = data || {};
      setForage('fsh_membrList', $.extend(oldMemList, membrList));
    });
}

function getGuildMembers(guildId) {
  return getGuild(guildId).pipe(function membrListToHash(data) {
    var membrList = {};
    membrList[guildId] = {};
    membrList[guildId].lastUpdate = now;
    data.forEach(function memberToObject(ele) {
      membrList[guildId][ele.username] = ele;
    });
    return membrList;
  });
}

function getMembrListFromForage(guildId, membrList) {
  if (membrList && membrList[guildId] &&
      membrList[guildId].lastUpdate &&
      membrList[guildId].lastUpdate > now - 300000) {
    return membrList;
  }
  return getGuildMembers(guildId).done(addMembrListToForage);
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

export default function getMembrList(force) {
  var guildId = currentGuildId();
  return guildMembers(force, guildId)
    .pipe(setHelperMembrList.bind(null, guildId));
}
