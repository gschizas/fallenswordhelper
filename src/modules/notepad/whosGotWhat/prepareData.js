import addCommas from '../../system/addCommas';
import lastActivityToDays from '../../common/lastActivityToDays';
import { nowSecs } from '../../support/now';
import partial from '../../common/partial';
import toLowerCase from '../../common/toLowerCase';

function byMember(acc, curr) {
  // if (curr.item_id === 11503) { // Zombie Brew
  acc[curr.player_id] = acc[curr.player_id] || [];
  acc[curr.player_id].push(curr);
  // }
  return acc;
}

function addRank(rankName, thisMember) {
  return { ...thisMember, rank_name: rankName };
}

function extractMembers(thisRank) {
  return thisRank.members.map(partial(addRank, thisRank.name));
}

function processGuild(guild) {
  return [].concat(...guild.r.ranks.map(extractMembers));
}

function decorateMembers(pots, obj, i) {
  return {
    ...obj,
    slot: i + 1,
    name_lower: toLowerCase(obj.name),
    lvl_reverse: 0 - obj.level,
    rank_lower: toLowerCase(obj.rank_name.trim()),
    gxp: addCommas(obj.guild_xp),
    gxp_reverse: 0 - obj.guild_xp,
    activity: lastActivityToDays(obj.last_activity),
    act: obj.last_activity - nowSecs,
    pack: (pots[obj.id] || []).length,
    pack_reverse: 0 - (pots[obj.id] || []).length,
    stam: addCommas(obj.current_stamina),
    stam_reverse: 0 - obj.current_stamina,
  };
}

export default function prepareData([json, guild]) {
  // console.log('json', json);
  const pots = json.items.reduce(byMember, {});
  // console.log('pots', pots);
  const members = processGuild(guild);
  // console.log('members', members);
  return members.map(partial(decorateMembers, pots));
}
