import getValue from '../../system/getValue';
import setValue from '../../system/setValue';

export var disableItemColoring;
export var showExtraLinks;
export var showQuickDropLinks;
export var showQuickSendLinks;

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
