import daGuildManage from '../_dataAccess/daGuildManage';
import fallback from '../system/fallback';
import getForage from '../ajax/getForage';
import getValue from '../system/getValue';
import jQueryPresent from '../common/jQueryPresent';
import lastActivityToDays from '../common/lastActivityToDays';
import {nowSecs} from '../support/now';
import partial from '../common/partial';
import setForage from '../ajax/setForage';
import {act, cur, gxp, lvl, max, utc, vl} from './guildTracker/indexConstants';

var oldArchive;
var guild;

function pushNewRecord(member) {
  oldArchive.members[member.name].push([
    lastActivityToDays(member.last_activity),
    member.current_stamina,
    member.level,
    member.max_stamina,
    nowSecs,
    member.vl,
    member.guild_xp,
  ]);
}

function initMember(member) {
  if (!oldArchive.members[member.name]) {
    oldArchive.members[member.name] = [];
    pushNewRecord(member);
  }
}

var type2tests = [
  function(archive, current) {
    // Has current stam changed ?
    return current.current_stamina !== archive[cur]; // probably want a weighted percentage here
    // Might only care if it has dropped significantly ?
  },
  function(archive, current) {
    // Has Max Stam increased ?
    return current.max_stamina > archive[max]; // probably want a weighted percentage here
  },
  function(archive, current) {
    // Has level changed ?
    return current.level !== archive[lvl];
  },
  function(archive, current) {
    // Has VL changed ?
    return current.vl !== archive[vl];
  },
  function(archive, current) {
    // Has GXP changed ?
    return current.guild_xp !== archive[gxp]; // probably want a weighted percentage here
  }
];

function change(archiveRecord, member, test) {
  return test(archiveRecord, member);
}

function hasChanged(archiveRecord, member) {
  return type2tests.some(partial(change, archiveRecord, member));
}

function upsert(archiveRecord, member) {
  if (hasChanged(archiveRecord, member)) {
    pushNewRecord(member);
  } else {
    archiveRecord[act] = lastActivityToDays(member.last_activity);
    archiveRecord[utc] = nowSecs;
  }
}

function processMemberRecord(newArchive, member) {
  initMember(member);
  var archiveMember = oldArchive.members[member.name];
  var archiveRecord = archiveMember[archiveMember.length - 1];
  var archiveAge = nowSecs - archiveRecord[utc];
  if (archiveAge >= 86100) {
    upsert(archiveRecord, member);
  }
  newArchive.members[member.name] = oldArchive.members[member.name];
}

function processRank(newArchive, rank) {
  rank.members.forEach(partial(processMemberRecord, newArchive));
}

function doMerge() { // jQuery.min
  var newArchive = {lastUpdate: nowSecs, members: {}};
  guild.r.ranks.forEach(partial(processRank, newArchive));
  setForage('fsh_guildActivity', newArchive);
}

function gotGuild(data) {
  if (data && data.r) {
    guild = data;
    doMerge();
  }
}

function gotActivity(data) { // jQuery.min
  if (data) {
    oldArchive = data;
  } else {
    oldArchive = {lastUpdate: 0, members: {}};
  }
  if (nowSecs > fallback(oldArchive.lastUpdate, 0) + 300) { // 5 mins - probably want to increase
    daGuildManage().then(gotGuild);
  }
}

export default function guildActivity() { // jQuery.min
  if (jQueryPresent() && getValue('enableGuildActivityTracker')) {
    getForage('fsh_guildActivity').then(gotActivity);
  }
}
