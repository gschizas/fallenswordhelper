import addCommas from '../../system/addCommas';
import {cdn} from '../../system/system';
import findArena from './findArena';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import querySelector from '../../common/querySelector';
import showMoves from './showMoves';
import takeSnapshot from './takeSnapshot';

const boolToString = e => String(Number(e));

function param(label, value) {
  return '<div><div>' + label + '</div><div><img src="' + cdn +
    'ui/arena/specials_' + boolToString(value) + '.png"></div></div>';
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
    takeSnapshot();
    //#endif
  }
}
