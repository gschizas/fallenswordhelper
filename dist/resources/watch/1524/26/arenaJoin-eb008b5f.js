import { b as createDiv, i as insertElement, f as insertHtmlBeforeEnd, aH as cdn, A as setInnerHtml, s as partial, k as on, D as querySelector, b0 as profile, b1 as off, p as pCC, P as once, aU as fromEntries, b2 as attribType, b3 as itemType, O as isArray, T as nowSecs, y as getElementById } from './calfSystem-c851a12c.js';
import './numberIsNaN-a6bcb044.js';
import { t as toLowerCase } from './toLowerCase-b21b7cc8.js';
import { a as addCommas } from './addCommas-b567f740.js';
import './setTipped-7d31935e.js';
import './insertElementBefore-47c09359.js';
import './currentGuildId-25856d67.js';
import './intValue-e4cdd281.js';
import { g as get, s as set } from './idb-6207cbac.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-a04443c1.js';
import './formToUrl-19af2e75.js';
import { h as handleSubmit, i as interceptSubmit } from './interceptSubmit-ad55085a.js';
import './closest-c2515a48.js';
import './closestTr-edab17ad.js';
import './lvlTests-7a9795f8.js';
import { a as all } from './all-646b32fa.js';
import './loadDataTables-ae2f6e83.js';
import './allthen-18c82be8.js';
import { i as injectArena, v as view } from './arena-17141e4f.js';
import './changeMinMax-bf9a1252.js';
import './assets-d1187a02.js';
import { a as arena } from './arena-bcaaac58.js';
import { t as thisTournament } from './thisTournament-9d84e592.js';
import { c as createSelect } from './createSelect-fa9f0418.js';
import { i as isSelected } from './isSelected-09e19637.js';

const css = ".moveImg {\r\n  display: inline-block;\r\n  height: 25px;\r\n  width: 25px;\r\n}\r\n\r\n.flex {\r\n  align-items: center;\r\n  display: flex;\r\n  justify-content: center\r\n}\r\n\r\n.flex div {padding: 2px;}\r\n";
const modules_54fe6fde = {};

function findArena(r) {
  const tourney = thisTournament();
  return r.arenas.find((e) => e.id === tourney);
}

function usesetup(setId) {
  return arena({ subcmd: 'usesetup', set_id: setId });
}

let moveContainer;

function getContainer(movesController) {
  if (!moveContainer) {
    moveContainer = insertElement(movesController, createDiv());
  }
  return moveContainer;
}

function injectImg(container, id) {
  let move = String(id - 1);
  if (id === 0) { move = 'x'; }
  insertHtmlBeforeEnd(container,
    `<img src="${cdn}arena/${move}.png" class="moveImg">`);
}

function thisOptions(currentSet, e) {
  return `<option value="${String(e.id)}"${
    isSelected(currentSet.slots.join(), e.slots.join())}>${e.name}</option>`;
}

function doMoves(thisSet, movesController) {
  const container = getContainer(movesController);
  setInnerHtml('', container);
  thisSet.slots.forEach(partial(injectImg, container));
}

function doChange(movesController, evt, thisSet) {
  usesetup(evt.target.value).then((json) => {
    if (json.s) {
      doMoves(thisSet, movesController);
    }
  });
}

function onchange(r, movesController, evt) {
  const thisSet = r.sets.find((e) => e.id === Number(evt.target.value));
  if (thisSet) { doChange(movesController, evt, thisSet); }
}

function doSelect(r, movesController) {
  if (r.sets.length > 0) {
    const thisSelect = createSelect({
      innerHTML: r.sets.map(partial(thisOptions, r.current_set))
        .join(''),
    });
    on(thisSelect, 'change', partial(onchange, r, movesController));
    const div = createDiv({ className: 'flex' });
    insertElement(div, thisSelect);
    insertElementAfterBegin(movesController, div);
  }
}

function showMoves(r, thisCell, thisArena) {
  if (thisArena.specials) {
    const movesController = createDiv({ className: 'flex' });
    doSelect(r, movesController);
    doMoves(r.current_set, movesController);
    insertElement(thisCell, movesController);
  }
}

const boolToString = (e) => String(Number(e));

function param(label, value) {
  return `<div><div>${label}</div><div><img src="${cdn
  }ui/arena/specials_${boolToString(value)}.png"></div></div>`;
}

function paramBox(thisArena) {
  return `<div class="flex"><div><div>Players</div><div>${
    thisArena.players.length} / ${thisArena.max_players}</div></div>${
    param('Specials', thisArena.specials)}${
    param('Hell Forge', thisArena.hellforge)}${
    param('Epic', thisArena.epic)}<div><div>Max Equip Level</div><div>${
    addCommas(thisArena.equip_level)}</div></div></div>`;
}

function showAttribs(json) {
  const thisCell = querySelector('#pCC > form > table tr:nth-of-type(4) td');
  if (json.r && thisCell) {
    thisCell.setAttribute('align', 'center');
    const thisArena = findArena(json.r);
    insertHtmlBeforeEnd(thisCell, paramBox(thisArena));
    showMoves(json.r, thisCell, thisArena);
  }
}

function join(pvpId) {
  return arena({ subcmd: 'join', pvp_id: pvpId });
}

function loadEquipped() {
  return profile({ subcmd: 'loadequipped' });
}

const mapAttribs = (joinData) => fromEntries(
  joinData.r.attributes.map(
    (o) => [`stat_${toLowerCase(attribType[o.id])}`, o.value],
  ),
);
const mapEquipment = (equipped) => fromEntries(
  equipped.r.map((o) => [toLowerCase(itemType[o.t]), o.n]),
);

async function buttonPress(e) {
  e.preventDefault();
  const pvpId = thisTournament();
  const [equipped, joinData, fshArenaJoined] = await all([
    loadEquipped(), join(pvpId), get('fsh_arenaJoined')]);
  if (isArray(equipped.r)) {
    const thisData = {
      pvpId,
      joined: nowSecs,
      ...mapEquipment(equipped),
      ...mapAttribs(joinData),
    };
    const newJoined = fshArenaJoined || [];
    newJoined.push(thisData);
    set('fsh_arenaJoined', newJoined);
  }
  handleSubmit(e);
}

function takeSnapshot() {
  // const submitButton = querySelector('input[type="submit"]', pCC);
  // if (submitButton) {
  // off(submitButton, 'click', zzzupdateUrl);
  // It might be better to replace the Join Tournament Button entirely
  off(pCC, 'submit', handleSubmit);
  // once(submitButton, 'click', buttonPress);
  once(pCC, 'submit', buttonPress);
  // }
}

function arenaJoin() {
  const tabs = getElementById('arenaTypeTabs');
  if (tabs) {
    injectArena();
  } else {
    interceptSubmit();
    view().catch(() => ({})).then(showAttribs);
    // eslint-disable-next-line no-unused-labels, no-labels
    devLbl: { //  arena snapshot
      takeSnapshot();
    }
  }
}

export default arenaJoin;
//# sourceMappingURL=arenaJoin-eb008b5f.js.map
