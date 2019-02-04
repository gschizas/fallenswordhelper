import {def_table} from '../support/constants';
import getArrayByTagName from '../common/getArrayByTagName';
import getTextTrim from '../common/getTextTrim';
import {pCC} from '../support/layout';
import partial from '../common/partial';

function getGuild(tbl) {
  if (tbl.rows[0].cells[0].children[0]) {
    return Number(
      /guild_id=(\d+)/.exec(tbl.rows[0].cells[0].children[0].href)[1]);
  }
  return -1;
}

function enumeratePlayers(playerTable) {
  return [playerTable, getTextTrim(playerTable), getGuild(playerTable)];
}

function aGuild(player, ary) {return ary[0] === player[2];}

function aggGuilds(prev, player) {
  var thisGuild = prev.find(partial(aGuild, player));
  if (thisGuild) {
    thisGuild[1].push(player);
  } else {
    prev.push([player[2], [player]]);
  }
  return prev;
}

function smallGuild(guildId, guild) {return guild[0] === guildId;}

function rollupSmallGuilds(prev, guild) {
  var guildId = guild[0];
  if (guild[1].length < 5) {guildId = -1;}
  var thisGuild = prev.find(partial(smallGuild, guildId));
  if (thisGuild) {
    thisGuild[1] = thisGuild[1].concat(guild[1]);
  } else {
    prev.push([guildId, guild[1]]);
  }
  return prev;
}

export default function getPlayersByGuild() {
  return getArrayByTagName(def_table, pCC).slice(4).map(enumeratePlayers)
    .reduce(aggGuilds, []).reduce(rollupSmallGuilds, []);
}
