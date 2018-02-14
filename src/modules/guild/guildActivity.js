import fallback from '../system/fallback';
import getForage from '../ajax/getForage';
import getValue from '../system/getValue';
import guildManage from '../app/guild/manage';
import jQueryPresent from '../common/jQueryPresent';
import {nowSecs} from '../support/constants';
import setForage from '../ajax/setForage';
import {act, cur, gxp, lvl, max, utc, vl} from './guildTracker/indexConstants';

var oldArchive;
var guild;

function pushNewRecord(member) {
  oldArchive.members[member.name].push([
    Math.floor(member.last_activity / 86400),
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

function doMerge() { // jQuery.min
  var newArchive = {lastUpdate: nowSecs, members: {}};
  guild.r.members.forEach(function(member) {
    initMember(member);
    var archiveMember = oldArchive.members[member.name];
    var archiveLength = archiveMember.length;
    var archiveRecord = archiveMember[archiveLength - 1];
    var archiveAge = nowSecs - archiveRecord[utc];
    if (archiveAge >= 86100) {
      var type2change = type2tests.some(function(test) {
        if (test(archiveRecord, member)) {
          return true;
        }
        return false;
      });
      if (type2change) {
        pushNewRecord(member);
      } else {
        archiveRecord[act] = Math.floor(member.last_activity / 86400);
        archiveRecord[utc] = nowSecs;
      }
    }
    newArchive.members[member.name] = oldArchive.members[member.name];
  });
  setForage('fsh_guildActivity', newArchive);
}

function gotGuild(data) {
  guild = data;
  doMerge();
}

function gotActivity(data) { // jQuery.min
  if (data) {
    oldArchive = data;
  } else {
    oldArchive = {lastUpdate: 0, members: {}};
  }
  if (nowSecs > fallback(oldArchive.lastUpdate, 0) + 300) { // 5 mins - probably want to increase
    guildManage().done(gotGuild);
  }
}

export default function guildActivity() { // jQuery.min
  if (jQueryPresent && getValue('enableGuildActivityTracker')) {
    getForage('fsh_guildActivity').done(gotActivity);
  }
}
