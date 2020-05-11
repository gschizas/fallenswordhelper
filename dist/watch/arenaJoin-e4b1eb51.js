import { e as createDiv, i as insertElement, k as insertHtmlBeforeEnd, aI as cdn, C as setInnerHtml, u as partial, l as on, f as insertElementAfterBegin, bl as profile, aJ as arrayFrom, N as indexPhp, S as querySelector, p as pCC, bm as off, R as once, bn as attribType, bo as itemType, ai as get, ay as nowSecs, aj as set, ac as addCommas, A as getElementById } from './calfSystem-05ea3a63.js';
import './dontPost-0ff218c1.js';
import './numberIsNaN-825e71c2.js';
import { t as toLowerCase } from './toLowerCase-6122d0ce.js';
import './setTipped-99d3968e.js';
import { a as all } from './all-c9a2b6b5.js';
import './allthen-f9ff4d25.js';
import './lvlTests-8b60a777.js';
import './loadDataTables-3a7296f0.js';
import { i as injectArena, v as view } from './arena-2ebe777f.js';
import './changeMinMax-f7b98da2.js';
import './assets-b89886ca.js';
import './updateUrl-bddae85c.js';
import { a as arena } from './arena-a11fb466.js';
import { t as thisTournament } from './thisTournament-6bbad5fa.js';
import { c as createSelect } from './createSelect-b35f8eb9.js';
import { i as isSelected } from './isSelected-98adb06c.js';
import { f as fromEntries } from './fromEntries-8d02555a.js';

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
  const validInputs = arrayFrom(e.target.closest('form').elements)
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
  const thisData = {
    pvpId,
    joined: nowSecs,
    ...mapEquipment(equipped),
    ...mapAttribs(joinData),
  };
  const newJoined = fshArenaJoined || [];
  newJoined.push(thisData);
  set('fsh_arenaJoined', newJoined);
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
    view().then(showAttribs);
  }
}

export default arenaJoin;
//# sourceMappingURL=arenaJoin-e4b1eb51.js.map
