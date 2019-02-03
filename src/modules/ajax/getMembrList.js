import calf from '../support/calf';
import currentGuildId from '../common/currentGuildId';
import getForage from './getForage';
import indexAjaxJson from './indexAjaxJson';
import isObject from '../common/isObject';
import {now} from '../support/constants';
import partial from '../common/partial';
import setForage from './setForage';

function getGuild(guildId) {
  return indexAjaxJson({
    cmd: 'export',
    subcmd: 'guild_members',
    guild_id: guildId
  });
}

function saveMembrListInForage(membrList, data) {
  var oldMemList = data || {};
  setForage('fsh_membrList', $.extend(oldMemList, membrList));
}

function addMembrListToForage(membrList) {
  getForage('fsh_membrList')
    .done(partial(saveMembrListInForage, membrList));
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
  return getGuild(guildId).pipe(partial(membrListToHash, guildId));
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
  return getGuildMembers(guildId).done(addMembrListToForage);
}

function guildMembers(force, guildId) {
  if (force) {
    return getGuildMembers(guildId).done(addMembrListToForage);
  }
  return getForage('fsh_membrList')
    .pipe(partial(getMembrListFromForage, guildId));
}

function setHelperMembrList(guildId, membrList) {
  calf.membrList = membrList[guildId];
  return calf.membrList;
}

export default function getMembrList(force) {
  var guildId = currentGuildId();
  return guildMembers(force, guildId)
    .pipe(partial(setHelperMembrList, guildId));
}
