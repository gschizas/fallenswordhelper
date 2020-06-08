import { B as getText, g as getElementsByTagName, p as pCC, I as getElementsByClassName, J as defStatLevel, y as getElementById, bw as defStatVl, V as setValue, H as defCharacterVirtualLevel, G as getValue, bx as runDefault, x as jQueryNotPresent, a as add } from './calfSystem-c0288c6c.js';
import { p as playerName$1 } from './playerName-544021b8.js';
import { c as colouredDots } from './colouredDots-e475b6dd.js';
import { i as intValue } from './intValue-e7ac83e4.js';
import { v as valueText } from './valueText-77bcf3af.js';
import { d as doStatTotal } from './doStatTotal-9583de62.js';
import { i as interceptSubmit } from './interceptSubmit-cad751a8.js';

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
    const m = await import('./debuff-7f5c56eb.js');
    m.default(fastDebuff, disableDeactivatePrompts);
  }
}

function doAllyEnemy() {
  if (getValue('countAllyEnemy')) { runDefault(import('./profileAllyEnemy-cac07dd4.js')); }
}

function doFastWear() {
  if (getValue('enableQuickDrink')) {
    runDefault(import('./fastWear-1c4c029d.js'));
  }
}

function doFixFolders() {
  if (getValue('fixFolderImages')) {
    runDefault(import('./fixFolders-c2c64fea.js'));
  }
}

function doComponents() {
  if (getValue('componentWidgets')) {
    runDefault(import('./components-2c1273b7.js'));
  }
}

function doQuickWearLink() {
  if (getValue('quickWearLink')) { runDefault(import('./quickWearLink-7b862383.js')); }
}

function doSelectAllLink() {
  if (getValue('selectAllLink')) { runDefault(import('./selectAllLink-30f712eb.js')); }
}

function doNekidBtn() {
  if (getValue('nekidButton')) { runDefault(import('./nekidBtn-ae5231a0.js')); }
}

function doAjaxifySections() {
  if (getValue('ajaxifyProfileSections')) {
    runDefault(import('./ajaxifyProfileSections-365c404c.js'));
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
    runDefault(import('./profileInjectGuildRel-1436f2d2.js'));
  }
}

function doQuickButtons() {
  if (getValue('showQuickButtons')) {
    runDefault(import('./profileInjectQuickButton-6b84d0cc.js'));
  }
}

function doUpdateBuffs() {
  if (getValue('injectBuffGuide')) { runDefault(import('./updateBuffs-2b0c131b.js')); }
}

function doUpdateStatistics() {
  if (getValue('statisticsWrap')) { runDefault(import('./updateStatistics-a453cdb8.js')); }
}

function doHighlightPvPProt() {
  if (getValue('highlightPvpProtection')) {
    runDefault(import('./highlightPvpProtection-31794fc7.js'));
  }
}

function doRenderBio() {
  if (shouldRender()) { runDefault(import('./bio-33a46bba.js')); }
}

function doCompressBio() {
  if (getValue('enableBioCompressor')) {
    runDefault(import('./compressBio-b69e678f.js'));
  }
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
//# sourceMappingURL=profile-6a8f9c2c.js.map
