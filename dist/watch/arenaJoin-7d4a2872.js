import { e as createDiv, i as insertElement, k as insertHtmlBeforeEnd, aI as cdn, C as setInnerHtml, u as partial, l as on, f as insertElementAfterBegin, bl as profile, aJ as arrayFrom, N as indexPhp, S as querySelector, p as pCC, bm as off, R as once, bn as attribType, bo as itemType, ak as get, Q as isArray, ay as nowSecs, ai as set, ac as addCommas, A as getElementById } from './calfSystem-98d7118c.js';
import './dontPost-043b70f2.js';
import './numberIsNaN-e9f5ff36.js';
import { t as toLowerCase } from './toLowerCase-7c48beec.js';
import './setTipped-01bbdd92.js';
import { a as all } from './all-9add17de.js';
import './allthen-b462b65b.js';
import './lvlTests-96e3fa7f.js';
import './loadDataTables-b5a0df23.js';
import { i as injectArena, v as view } from './arena-78a3140b.js';
import './changeMinMax-235bca1d.js';
import './assets-325dd726.js';
import './updateUrl-04275bcc.js';
import { a as arena } from './arena-4e3be6ba.js';
import { t as thisTournament } from './thisTournament-59077470.js';
import { c as createSelect } from './createSelect-30875071.js';
import { i as isSelected } from './isSelected-ba113274.js';
import { f as fromEntries } from './fromEntries-b22a24fd.js';

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
//# sourceMappingURL=arenaJoin-7d4a2872.js.map
