import addCommas from '../../system/addCommas';
import getArrayByTagName from '../../common/getArrayByTagName';
import getTextTrim from '../../common/getTextTrim';
import {imageServer} from '../../system/system';
import includes from '../../common/includes';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import {pCC} from '../../support/layout';
import querySelector from '../../common/querySelector';
import showMoves from './showMoves';
import takeSnapshot from './takeSnapshot';

const boolToString = e => String(Number(e));

const thisTournament = () => Number(getTextTrim(getArrayByTagName('b', pCC)
  .find(includes('Tournament #'))).match(/\d+/)[0]);

function findArena(r) {
  const tourney = thisTournament();
  return r.arenas.find(e => e.id === tourney);
}

function param(label, value) {
  return '<div><div>' + label + '</div><div><img src="' + imageServer +
    '/pvp/specials_' + boolToString(value) + '.gif"></div></div>';
}

function paramBox(thisArena) {
  return '<div class="flex">' +
      `<div><div>Players</div><div>${thisArena.players.length} / ${
        thisArena.max_players}</div></div>` +
      param('Specials', thisArena.specials) +
      param('Hell Forge', thisArena.hellforge) +
      param('Epic', thisArena.epic) +
      `<div><div>Max Equip Level</div><div>${
        addCommas(thisArena.equip_level)}</div></div>` +
    '</div>';
}

export default function showAttribs(json) {
  const thisCell = querySelector('#pCC > form > table tr:nth-of-type(7) td');
  if (json.r && thisCell) {
    thisCell.setAttribute('align', 'center');
    const thisArena = findArena(json.r);
    insertHtmlBeforeEnd(thisCell, paramBox(thisArena));
    showMoves(json.r, thisCell, thisArena);
    //#if _DEV  //  arena snapshot
    takeSnapshot(json.r, thisArena);
    //#endif
  }
}
