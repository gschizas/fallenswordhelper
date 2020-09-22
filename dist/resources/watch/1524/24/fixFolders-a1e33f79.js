import { aH as cdn, E as querySelectorArray, s as partial } from './calfSystem-dea093d3.js';
import { g as getBackpack, m as monkeyBp } from './monkeyBp-9860fb5f.js';

function updateSrc(img, gif) {
  const url = `${cdn}ui/misc/${gif}.png`;
  // eslint-disable-next-line no-param-reassign
  if (img.src !== url) { img.src = url; }
}

function doFolder(thisFolder, img) {
  if (img.dataset.folder === thisFolder) {
    updateSrc(img, 'folder_on');
  } else {
    updateSrc(img, 'folder');
  }
}

function doFix(theBackpack) {
  querySelectorArray('.backpackFolderImage')
    .forEach(partial(doFolder, String(theBackpack.folderId)));
}

function fixFolders() {
  const theBackpack = getBackpack();
  if (theBackpack) { monkeyBp(theBackpack, doFix); }
}

export default fixFolders;
//# sourceMappingURL=fixFolders-a1e33f79.js.map
