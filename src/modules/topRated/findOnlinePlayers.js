import findplayer from '../app/findplayer';
import getPlayersByGuild from './getPlayersByGuild';
import guildView from '../app/guild/view';
import {nowSecs} from '../support/now';
import partial from '../common/partial';
import playerName from '../common/playerName';
import {sendEvent} from '../support/fshGa';
import uniq from '../common/uniq';
import view from '../app/profile/view';
import when from '../common/when';
import {decoratePlayer, initDecorate} from './decoratePlayer';
import {displaySpinner, hideSpinner} from './displaySpinner';

function parsePlayer(player, data) {
  decoratePlayer(player[0], player[2], {
    last_login: String(data.last_activity),
    virtual_level: data.vl
  });
}

function thisMember(player, member) {return member.name === player[1];}

function guildPlayer(guildMembers, player) {
  var member = guildMembers.find(partial(thisMember, player));
  if (member) {parsePlayer(player, member);}
}

function returnPlayer(player, json) {
  if (json.s && Array.isArray(json.r)) {parsePlayer(player, json.r[0]);}
}

function returnSelf(player, json) {
  if (json.s) {
    parsePlayer(player, {
      last_activity: nowSecs - json.r.last_activity,
      vl: json.r.virtual_level
    });
  }
}

function big(guild) {return guild[0] !== -1;}

function getMembers(prev, curr) {return prev.concat(curr.members);}

function parseGuild(guild, json) {
  var guildMembers = uniq(json.r.ranks, 'id').reduce(getMembers, []);
  guild[1].forEach(partial(guildPlayer, guildMembers));
}

function returnGuild(guild, json) {if (json.s) {parseGuild(guild, json);}}

function ajaxGuild(guild) {
  return guildView(guild[0]).then(partial(returnGuild, guild));
}

function small(guild) {return guild[0] === -1;}

function ajaxPlayer(player) {
  if (player[1] !== playerName()) {
    return findplayer(player[1]).then(partial(returnPlayer, player));
  }
  return view().then(partial(returnSelf, player));
}

function prepareAjax() {
  var guilds = getPlayersByGuild();
  var prm = guilds.filter(big).map(ajaxGuild);
  var singles = guilds.find(small);
  if (singles) {
    prm = prm.concat(guilds.find(small)[1].map(ajaxPlayer));
  }
  when(prm, hideSpinner);
}

export default function findOnlinePlayers(e) {
  sendEvent('toprated', 'FindOnlinePlayers');
  displaySpinner(e.target);
  initDecorate();
  prepareAjax();
}
