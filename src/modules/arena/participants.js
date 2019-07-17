import './participants.postcss';
import currentGuildId from '../common/currentGuildId';
import {isArray} from '../common/isArray';
import isObject from '../common/isObject';
import partial from '../common/partial';
import querySelectorArray from '../common/querySelectorArray';

const addId = e => [e, Number(e.previousElementSibling.value)];

function addMeta(json, e) {
  if (json.r && json.r.arenas) {
    return e.concat(json.r.arenas.find(a => a.id === e[1]));
  }
  return e;
}

function listPlayers(myGuild, p) {
  if (p.guild_id === myGuild) {
    return '<span class="fshRed">' + p.name + '</span>';
  }
  return p.name;
}

const joinBtn = (myGuild, button) => myGuild && button.value === 'Join';

function testGuildies(myGuild, button, arena) {
  const fromMyGuild = arena.players.filter(p => p.guild_id === myGuild)
    .length;
  const maxGuildies = arena.max_players / 4;
  if (fromMyGuild === maxGuildies) {button.classList.add('fshGray');}
}

function hazPlayers(myGuild, button, arena) {
  button.dataset.tipped = arena.players.map(partial(listPlayers, myGuild))
    .join('<br>');
  button.classList.add('tip-static');
  if (joinBtn(myGuild, button)) {testGuildies(myGuild, button, arena);}
}

const arenaChecks = [isObject, e => isArray(e.players),
  e => e.players.length > 0];

function decorate(myGuild, [button, , arena]) {
  if (arenaChecks.every(f => f(arena))) {
    hazPlayers(myGuild, button, arena);
  }
}

export default function participants(json) {
  if (!json.s) {return;}
  const theButtons = querySelectorArray(
    '#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]');
  const withPvpId = theButtons.map(addId);
  const withMeta = withPvpId.map(partial(addMeta, json));
  withMeta.forEach(partial(decorate, currentGuildId()));
  return 0;
}
