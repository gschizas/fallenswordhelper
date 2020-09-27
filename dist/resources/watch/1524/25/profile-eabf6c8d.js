import { B as getText, g as getElementsByTagName, p as pCC, I as getElementsByClassName, J as defStatLevel, y as getElementById, bw as defStatVl, V as setValue, H as defCharacterVirtualLevel, G as getValue, bx as runDefault, x as jQueryNotPresent, a as add } from './calfSystem-0ffc234f.js';
import { p as playerName$1 } from './playerName-a4720b96.js';
import { c as colouredDots } from './colouredDots-fb7d4e36.js';
import { i as intValue } from './intValue-65d3c36c.js';
import { v as valueText } from './valueText-173142a3.js';
import { d as doStatTotal } from './doStatTotal-164abc6a.js';
import { i as interceptSubmit } from './interceptSubmit-b0fa4c9c.js';

let playerName;

function getPlayerName() {
  if (!playerName) {
    playerName = getText(getElementsByTagName('h1', pCC)[0]);
  }
  return playerName;
}

let haveSelf;
let isSelf;

function getIsSelf() {
  if (!haveSelf) {
    isSelf = getPlayerName() === playerName$1();
    haveSelf = true;
  }
  return isSelf;
}

function sameAsLevel(virtualLevel) {
  return intValue(valueText(
    getElementsByClassName(defStatLevel),
  )) === virtualLevel;
}

function storeVL() {
  // store the VL of the player
  const virtualLevel = Number(getText(getElementById(defStatVl)));
  if (sameAsLevel(virtualLevel)) {
    setValue(defCharacterVirtualLevel, ''); // ?
  } else {
    setValue(defCharacterVirtualLevel, virtualLevel);
  }
}

async function doFastDebuff() {
  const fastDebuff = getValue('fastDebuff');
  const disableDeactivatePrompts = getValue('disableDeactivatePrompts');
  if (fastDebuff || disableDeactivatePrompts) {
    const m = await import('./debuff-4f92b5a3.js');
    m.default(fastDebuff, disableDeactivatePrompts);
  }
}

function doAllyEnemy() {
  if (getValue('countAllyEnemy')) { runDefault(import('./profileAllyEnemy-c8765170.js')); }
}

function doFastWear() {
  if (getValue('enableQuickDrink')) {
    runDefault(import('./fastWear-903d6b85.js'));
  }
}

function doFixFolders() {
  if (getValue('fixFolderImages')) {
    runDefault(import('./fixFolders-e36f542f.js'));
  }
}

function doComponents() {
  if (getValue('componentWidgets')) {
    runDefault(import('./components-19a607f6.js'));
  }
}

function doQuickWearLink() {
  if (getValue('quickWearLink')) { runDefault(import('./quickWearLink-5cd6b226.js')); }
}

function doSelectAllLink() {
  if (getValue('selectAllLink')) { runDefault(import('./selectAllLink-f3608142.js')); }
}

function doNekidBtn() {
  if (getValue('nekidButton')) { runDefault(import('./nekidBtn-9d8d2151.js')); }
}

function doAjaxifySections() {
  if (getValue('ajaxifyProfileSections')) {
    runDefault(import('./ajaxifyProfileSections-310d2df8.js'));
  }
}

function ifSelf() {
  if (getIsSelf()) {
    // self inventory
    doFastDebuff();
    doAllyEnemy();
    doFastWear();
    doFixFolders();
    doComponents();
    doQuickWearLink();
    doSelectAllLink();
    storeVL();
    doNekidBtn();
    doAjaxifySections();
  }
}

function selfRender(isSelf) {
  return isSelf && getValue('renderSelfBio');
}

function otherRender(isSelf) {
  return !isSelf && getValue('renderOtherBios');
}

function shouldRender() {
  const isSelf = getIsSelf();
  return selfRender(isSelf) || otherRender(isSelf);
}

function doGuildRelationship() {
  if (getValue('showGuildRelationship')) {
    runDefault(import('./profileInjectGuildRel-ad7e0e68.js'));
  }
}

function doQuickButtons() {
  if (getValue('showQuickButtons')) {
    runDefault(import('./profileInjectQuickButton-ef1de4d0.js'));
  }
}

function doUpdateBuffs() {
  if (getValue('injectBuffGuide')) { runDefault(import('./updateBuffs-8169df65.js')); }
}

function doUpdateStatistics() {
  if (getValue('statisticsWrap')) { runDefault(import('./updateStatistics-01a89af0.js')); }
}

function doHighlightPvPProt() {
  if (getValue('highlightPvpProtection')) {
    runDefault(import('./highlightPvpProtection-36b47757.js'));
  }
}

function doRenderBio() {
  if (shouldRender()) { runDefault(import('./bio-e479c274.js')); }
}

function doCompressBio() {
  if (getValue('enableBioCompressor')) {
    runDefault(import('./compressBio-b9063c72.js'));
  }
}

function doBuffLevels() {
  if (getValue('showBuffLevel')) { runDefault(import('./buffLevelDisplay-a15cbf7f.js')); }
}

function updateDom() {
  ifSelf();
  doGuildRelationship();
  doQuickButtons();
  doUpdateBuffs();
  doUpdateStatistics();
  doHighlightPvPProt();
  doRenderBio();
  doCompressBio();
  doStatTotal();
  doBuffLevels();
  add(3, colouredDots);
}

function allowBack() {
  if (!getIsSelf()) { interceptSubmit(); }
}

function injectProfile() {
  if (jQueryNotPresent()) { return; }
  updateDom();
  allowBack();
}

var profile = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': injectProfile
});

export { getPlayerName as a, getIsSelf as g, profile as p };
//# sourceMappingURL=profile-eabf6c8d.js.map
