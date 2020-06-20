import { B as getText, g as getElementsByTagName, p as pCC, I as getElementsByClassName, J as defStatLevel, y as getElementById, bw as defStatVl, V as setValue, H as defCharacterVirtualLevel, G as getValue, bx as runDefault, x as jQueryNotPresent, a as add } from './calfSystem-b0234231.js';
import { p as playerName$1 } from './playerName-251bfc8f.js';
import { c as colouredDots } from './colouredDots-22ad93a5.js';
import { i as intValue } from './intValue-639b8a5f.js';
import { v as valueText } from './valueText-d30c1f8a.js';
import { d as doStatTotal } from './doStatTotal-f25dc67d.js';
import { i as interceptSubmit } from './interceptSubmit-e148f699.js';

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
    const m = await import('./debuff-8c692d29.js');
    m.default(fastDebuff, disableDeactivatePrompts);
  }
}

function doAllyEnemy() {
  if (getValue('countAllyEnemy')) { runDefault(import('./profileAllyEnemy-b376a519.js')); }
}

function doFastWear() {
  if (getValue('enableQuickDrink')) {
    runDefault(import('./fastWear-9d8831f0.js'));
  }
}

function doFixFolders() {
  if (getValue('fixFolderImages')) {
    runDefault(import('./fixFolders-780e0d88.js'));
  }
}

function doComponents() {
  if (getValue('componentWidgets')) {
    runDefault(import('./components-e7bb6eb1.js'));
  }
}

function doQuickWearLink() {
  if (getValue('quickWearLink')) { runDefault(import('./quickWearLink-405438d2.js')); }
}

function doSelectAllLink() {
  if (getValue('selectAllLink')) { runDefault(import('./selectAllLink-ad68a5d7.js')); }
}

function doNekidBtn() {
  if (getValue('nekidButton')) { runDefault(import('./nekidBtn-7b746cf0.js')); }
}

function doAjaxifySections() {
  if (getValue('ajaxifyProfileSections')) {
    runDefault(import('./ajaxifyProfileSections-f489d291.js'));
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
    runDefault(import('./profileInjectGuildRel-7e7dad6d.js'));
  }
}

function doQuickButtons() {
  if (getValue('showQuickButtons')) {
    runDefault(import('./profileInjectQuickButton-78b210f1.js'));
  }
}

function doUpdateBuffs() {
  if (getValue('injectBuffGuide')) { runDefault(import('./updateBuffs-c8f88800.js')); }
}

function doUpdateStatistics() {
  if (getValue('statisticsWrap')) { runDefault(import('./updateStatistics-1a0f3c3d.js')); }
}

function doHighlightPvPProt() {
  if (getValue('highlightPvpProtection')) {
    runDefault(import('./highlightPvpProtection-a2fb3589.js'));
  }
}

function doRenderBio() {
  if (shouldRender()) { runDefault(import('./bio-fd1b1e5e.js')); }
}

function doCompressBio() {
  if (getValue('enableBioCompressor')) {
    runDefault(import('./compressBio-03fa805e.js'));
  }
}

function doBuffLevels() {
  if (getValue('showBuffLevel')) { runDefault(import('./buffLevelDisplay-02963e3c.js')); }
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
//# sourceMappingURL=profile-6f0adbc7.js.map
