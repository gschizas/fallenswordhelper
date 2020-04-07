import getValue from '../../system/getValue';
import setValue from '../../system/setValue';

export let disableItemColoring;
export let showExtraLinks;
export let showQuickDropLinks;
export let showQuickSendLinks;

export function setShowExtraLinks() {
  showExtraLinks = !showExtraLinks;
  setValue('showExtraLinks', showExtraLinks);
}

export function setShowQuickDropLinks() {
  showQuickDropLinks = !showQuickDropLinks;
  setValue('showQuickDropLinks', showQuickDropLinks);
}

export function getPrefs() {
  disableItemColoring = getValue('disableItemColoring');
  showExtraLinks = getValue('showExtraLinks');
  showQuickDropLinks = getValue('showQuickDropLinks');
  showQuickSendLinks = getValue('showQuickSendLinks');
}
