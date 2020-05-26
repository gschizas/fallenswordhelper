import { a5 as set, a7 as get, r as partial, aA as now, aO as isObject, c as calf } from './calfSystem-b469667c.js';
import { c as currentGuildId } from './currentGuildId-582db9c2.js';
import { c as cmdExport } from './cmdExport-b618c276.js';

function guildMembers(guildId) {
  return cmdExport({ guild_id: guildId, subcmd: 'guild_members' });
}

function saveMembrListInForage(membrList, data) {
  const oldMemList = data || {};
  set('fsh_membrList', $.extend(oldMemList, membrList));
}

function addMembrListToForage(membrList) {
  get('fsh_membrList')
    .then(partial(saveMembrListInForage, membrList));
  return membrList;
}

function memberToObject(membrList, guildId, ele) {
  // eslint-disable-next-line no-param-reassign
  membrList[guildId][ele.username] = ele;
}

function membrListToHash(guildId, data) {
  const membrList = {};
  membrList[guildId] = {};
  membrList[guildId].lastUpdate = now;
  data.forEach(partial(memberToObject, membrList, guildId));
  return membrList;
}

function getGuildMembers(guildId) {
  return guildMembers(guildId).then(partial(membrListToHash, guildId));
}

function getAndCacheGuildMembers(guildId) {
  return getGuildMembers(guildId).then(addMembrListToForage);
}

const testList = [
  (guildId, membrList) => membrList,
  (guildId, membrList) => isObject(membrList),
  (guildId, membrList) => isObject(membrList[guildId]),
  (guildId, membrList) => typeof membrList[guildId].lastUpdate === 'number',
  (guildId, membrList) => membrList[guildId].lastUpdate > now - 300000,
];

function condition(guildId, membrList, e) { return e(guildId, membrList); }

function isValid(guildId, membrList) {
  return testList.every(partial(condition, guildId, membrList));
}

function getMembrListFromForage(guildId, membrList) {
  if (isValid(guildId, membrList)) {
    return membrList;
  }
  return getAndCacheGuildMembers(guildId);
}

function guildMembers$1(force, guildId) {
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

function getMembrList(force) {
  const guildId = currentGuildId();
  if (guildId) {
    return guildMembers$1(force, guildId)
      .then(partial(setHelperMembrList, guildId));
  }
  return Promise.reject(new Error('no guild id'));
}

export { getMembrList as g };
//# sourceMappingURL=getMembrList-657ec016.js.map
