import calf from '../support/calf';
import currentGuildId from '../common/currentGuildId';
import getGuild from '../_dataAccess/export/guildMembers';
import isObject from '../common/isObject';
import {now} from '../support/now';
import partial from '../common/partial';
import {get, set} from 'idb-keyval';

function saveMembrListInForage(membrList, data) {
  var oldMemList = data || {};
  set('fsh_membrList', $.extend(oldMemList, membrList));
}

function addMembrListToForage(membrList) {
  get('fsh_membrList')
    .then(partial(saveMembrListInForage, membrList));
  return membrList;
}

function memberToObject(membrList, guildId, ele) {
  membrList[guildId][ele.username] = ele;
}

function membrListToHash(guildId, data) {
  var membrList = {};
  membrList[guildId] = {};
  membrList[guildId].lastUpdate = now;
  data.forEach(partial(memberToObject, membrList, guildId));
  return membrList;
}

function getGuildMembers(guildId) {
  return getGuild(guildId).then(partial(membrListToHash, guildId));
}

function getAndCacheGuildMembers(guildId) {
  return getGuildMembers(guildId).then(addMembrListToForage);
}

var testList = [
  function(guildId, membrList) {return membrList;},
  function(guildId, membrList) {return isObject(membrList);},
  function(guildId, membrList) {return isObject(membrList[guildId]);},
  function(guildId, membrList) {
    return typeof membrList[guildId].lastUpdate === 'number';
  },
  function(guildId, membrList) {
    return membrList[guildId].lastUpdate > now - 300000;
  }
];

function condition(guildId, membrList, e) {return e(guildId, membrList);}

function isValid(guildId, membrList) {
  return testList.every(partial(condition, guildId, membrList));
}

function getMembrListFromForage(guildId, membrList) {
  if (isValid(guildId, membrList)) {
    return membrList;
  }
  return getAndCacheGuildMembers(guildId);
}

function guildMembers(force, guildId) {
  if (force) {
    return getAndCacheGuildMembers(guildId);
  }
  return get('fsh_membrList')
    .then(partial(getMembrListFromForage, guildId));
}

function setHelperMembrList(guildId, membrList) {
  calf.membrList = membrList[guildId];
  return calf.membrList;
}

export default function getMembrList(force) {
  var guildId = currentGuildId();
  if (guildId) {
    return guildMembers(force, guildId)
      .then(partial(setHelperMembrList, guildId));
  }
  return Promise.reject(new Error('no guild id'));
}
