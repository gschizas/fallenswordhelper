import executeAll from '../../common/executeAll';
import getIsSelf from '../getIsSelf';
import getValue from '../../system/getValue';
import runDefault from '../../common/runDefault';
import storeVL from './storeVL';

async function doFastDebuff() {
  const fastDebuff = getValue('fastDebuff');
  const disableDeactivatePrompts = getValue('disableDeactivatePrompts');
  if (fastDebuff || disableDeactivatePrompts) {
    const m = await import('./debuff');
    m.default(fastDebuff, disableDeactivatePrompts);
  }
}

function doAllyEnemy() {
  if (getValue('countAllyEnemy')) { runDefault(import('./profileAllyEnemy')); }
}

function doFastWear() {
  if (getValue('enableQuickDrink')) {
    runDefault(import('../backpack/fastWear'));
  }
}

function doFixFolders() {
  if (getValue('fixFolderImages')) {
    runDefault(import('../backpack/fixFolders'));
  }
}

function doComponents() {
  if (getValue('componentWidgets')) {
    runDefault(import('../components/components'));
  }
}

function doQuickWearLink() {
  if (getValue('quickWearLink')) { runDefault(import('./quickWearLink')); }
}

function doSelectAllLink() {
  if (getValue('selectAllLink')) { runDefault(import('./selectAllLink')); }
}

function doNekidBtn() {
  if (getValue('nekidButton')) { runDefault(import('./nekidBtn')); }
}

function doAjaxifySections() {
  if (getValue('ajaxifyProfileSections')) {
    runDefault(import('./ajaxifyProfileSections'));
  }
}

export default function ifSelf() {
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
