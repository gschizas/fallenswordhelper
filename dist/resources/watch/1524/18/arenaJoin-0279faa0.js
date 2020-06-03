import { b as createDiv, i as insertElement, e as insertHtmlBeforeEnd, aG as cdn, z as setInnerHtml, r as partial, f as on, b1 as profile, a3 as arrayFrom, I as indexPhp, N as querySelector, p as pCC, b2 as off, M as once, aV as fromEntries, b3 as attribType, b4 as itemType, L as isArray, R as nowSecs, x as getElementById } from './calfSystem-940bc1b5.js';
import './dontPost-2931988f.js';
import './numberIsNaN-6ac4f483.js';
import { t as toLowerCase } from './toLowerCase-fb9a995b.js';
import { a as addCommas } from './addCommas-73cade6a.js';
import './setTipped-2d327644.js';
import './currentGuildId-86fac8cc.js';
import './intValue-883414eb.js';
import { g as get, s as set } from './idb-9fdca27d.js';
import './insertElementBefore-4c8d2347.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-67909c7f.js';
import './closest-3a8e7614.js';
import { c as closestForm } from './closestForm-0ccc7754.js';
import { a as all } from './all-d5dc3a0a.js';
import './allthen-aa100d71.js';
import './closestTr-746f9cb4.js';
import './lvlTests-5adf3fe9.js';
import './loadDataTables-f12bf290.js';
import { i as injectArena, v as view } from './arena-02939610.js';
import './changeMinMax-19fded4d.js';
import './assets-5d3515ba.js';
import './updateUrl-8026df84.js';
import { a as arena } from './arena-b1919616.js';
import { t as thisTournament } from './thisTournament-1b810b23.js';
import { c as createSelect } from './createSelect-feea30f6.js';
import { i as isSelected } from './isSelected-e4674131.js';

var undefined$1 = undefined;

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

function join(pvpId) {
  return arena({ subcmd: 'join', pvp_id: pvpId });
}

function loadEquipped() {
  return profile({ subcmd: 'loadequipped' });
}

function updateUrl(e) {
  e.preventDefault();
  const validInputs = arrayFrom(closestForm(e.target).elements)
    .filter((i) => i.type !== 'submit')
    .map((i) => `${i.name}=${i.value}`)
    .join('&');
  window.location = `${indexPhp}?${validInputs}`;
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
  updateUrl(e);
}

function takeSnapshot() {
  const submitButton = querySelector('input[type="submit"]', pCC);
  if (submitButton) {
    off(submitButton, 'click', updateUrl);
    once(submitButton, 'click', buttonPress);
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
    // eslint-disable-next-line no-unused-labels, no-labels
    devLbl: { //  arena snapshot
      takeSnapshot();
    }
  }
}

function allowBack() {
  const submitButton = querySelector('input[type="submit"]', pCC);
  if (submitButton) {
    once(submitButton, 'click', updateUrl);
  }
}

function arenaJoin() {
  const tabs = getElementById('arenaTypeTabs');
  if (tabs) {
    injectArena();
  } else {
    allowBack();
    view().catch(() => ({})).then(showAttribs);
  }
}

export default arenaJoin;
//# sourceMappingURL=arenaJoin-0279faa0.js.map
