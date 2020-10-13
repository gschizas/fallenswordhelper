import { b as createDiv, i as insertElement, f as insertHtmlBeforeEnd, aH as cdn, A as setInnerHtml, s as partial, k as on, D as querySelector, a$ as profile, b0 as off, p as pCC, P as once, aT as fromEntries, b1 as attribType, b2 as itemType, O as isArray, T as nowSecs, y as getElementById } from './calfSystem-21d16a0e.js';
import './numberIsNaN-91041dcf.js';
import { t as toLowerCase } from './toLowerCase-27ea448e.js';
import { a as addCommas } from './addCommas-8259c1a9.js';
import './setTipped-e5305fe4.js';
import './insertElementBefore-eada6f05.js';
import './currentGuildId-ce8bf3c5.js';
import './intValue-f4d85578.js';
import { g as get, s as set } from './idb-42714ac8.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-6a4e1b31.js';
import './formToUrl-2fddf9de.js';
import { h as handleSubmit, i as interceptSubmit } from './interceptSubmit-719ace11.js';
import './closest-9ef1a6fc.js';
import './closestTr-5bf285ab.js';
import './lvlTests-0092190a.js';
import { a as all } from './all-7e2b4bf6.js';
import './loadDataTables-dc805378.js';
import './allthen-7191069a.js';
import { i as injectArena, v as view } from './arena-bb4859d1.js';
import './changeMinMax-9ec858ae.js';
import './assets-48002450.js';
import { a as arena } from './arena-81f3394d.js';
import { t as thisTournament } from './thisTournament-8f68914f.js';
import { c as createSelect } from './createSelect-d5eebaaf.js';
import { i as isSelected } from './isSelected-1ef1e976.js';

var css = ".moveImg {\r\n  display: inline-block;\r\n  height: 25px;\r\n  width: 25px;\r\n}\r\n\r\n.flex {\r\n  align-items: center;\r\n  display: flex;\r\n  justify-content: center\r\n}\r\n\r\n.flex div {padding: 2px;}\r\n";
var modules_54fe6fde = {};

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
//# sourceMappingURL=arenaJoin-8f06a23e.js.map
