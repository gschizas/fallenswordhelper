import { B as getText, g as getElementsByTagName, p as pCC, I as getElementsByClassName, J as defStatLevel, y as getElementById, bt as defStatVl, V as setValue, H as defCharacterVirtualLevel, G as getValue, bu as runDefault, x as jQueryNotPresent, a as add } from './calfSystem-d357ca6f.js';
import { p as playerName$1 } from './playerName-35237fe6.js';
import { c as colouredDots } from './colouredDots-f5d022b5.js';
import { i as intValue } from './intValue-e8157483.js';
import { v as valueText } from './valueText-6e721c40.js';
import { d as doStatTotal } from './doStatTotal-a9fb57d6.js';
import { e as executeAll } from './executeAll-be2ac0ec.js';
import { i as interceptSubmit } from './interceptSubmit-8526eadf.js';

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
    const m = await import('./debuff-f32c9964.js');
    m.default(fastDebuff, disableDeactivatePrompts);
  }
}

function doAllyEnemy() {
  if (getValue('countAllyEnemy')) { runDefault(import('./profileAllyEnemy-a906dbfc.js')); }
}

function doFastWear() {
  if (getValue('enableQuickDrink')) {
    runDefault(import('./fastWear-a10ce08f.js'));
  }
}

function doFixFolders() {
  if (getValue('fixFolderImages')) {
    runDefault(import('./fixFolders-ce06b6e6.js'));
  }
}

function doComponents() {
  if (getValue('componentWidgets')) {
    runDefault(import('./components-810f293a.js'));
  }
}

function doQuickWearLink() {
  if (getValue('quickWearLink')) { runDefault(import('./quickWearLink-2f56091c.js')); }
}

function doSelectAllLink() {
  if (getValue('selectAllLink')) { runDefault(import('./selectAllLink-14697e23.js')); }
}

function doNekidBtn() {
  if (getValue('nekidButton')) { runDefault(import('./nekidBtn-ad2a5759.js')); }
}

function doAjaxifySections() {
  if (getValue('ajaxifyProfileSections')) {
    runDefault(import('./ajaxifyProfileSections-c3186946.js'));
  }
}

function ifSelf() {
  if (getIsSelf()) {
    // self inventory
    executeAll([
      doFastDebuff,
      doAllyEnemy,
      doFastWear,
      doFixFolders,
      doComponents,
      doQuickWearLink,
      doSelectAllLink,
      storeVL,
      doNekidBtn,
      doAjaxifySections,
    ]);
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
    runDefault(import('./profileInjectGuildRel-a5c3dbcd.js'));
  }
}

function doQuickButtons() {
  if (getValue('showQuickButtons')) {
    runDefault(import('./profileInjectQuickButton-ecbe1cfc.js'));
  }
}

function doUpdateBuffs() {
  if (getValue('injectBuffGuide')) { runDefault(import('./updateBuffs-cddcb9c6.js')); }
}

function doUpdateStatistics() {
  if (getValue('statisticsWrap')) { runDefault(import('./updateStatistics-0d296167.js')); }
}

function doHighlightPvPProt() {
  if (getValue('highlightPvpProtection')) {
    runDefault(import('./highlightPvpProtection-fd4d38f0.js'));
  }
}

function doRenderBio() {
  if (shouldRender()) { runDefault(import('./bio-ed371a85.js')); }
}

function doCompressBio() {
  if (getValue('enableBioCompressor')) {
    runDefault(import('./compressBio-60c14bbc.js'));
  }
}

function doBuffLevels() {
  if (getValue('showBuffLevel')) { runDefault(import('./buffLevelDisplay-c53c6bd7.js')); }
}

function updateDom() {
  executeAll([
    ifSelf,
    doGuildRelationship,
    doQuickButtons,
    doUpdateBuffs,
    doUpdateStatistics,
    doHighlightPvPProt,
    doRenderBio,
    doCompressBio,
    doStatTotal,
    doBuffLevels,
  ]);
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
//# sourceMappingURL=profile-6746ccd4.js.map
