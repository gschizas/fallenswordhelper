import calf from '../support/calf';
import currentGuildId from '../common/currentGuildId';
import getForage from './getForage';
import isObject from '../common/isObject';
import {now} from '../support/constants';
import partial from '../common/partial';
import retryAjax from './retryAjax';
import setForage from './setForage';

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

var testList = [
  function(guildId, membrList) {return Boolean(membrList);},
  function(guildId, membrList) {return isObject(membrList);},
  function(guildId, membrList) {return isObject(membrList[guildId]);},
  function(guildId, membrList) {
    return typeof membrList[guildId].lastUpdate === 'number';
  },
  function(guildId, membrList) {
    return membrList[guildId].lastUpdate > now - 300000;
  }
];

function getMembrListFromForage(guildId, membrList) {
  if (testList.every(function(e) {return e(guildId, membrList);})) {
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
