import { cdn } from '../../system/system';
import getBackpack from './getBackpack';
import monkeyBp from './monkeyBp';
import partial from '../../common/partial';
import querySelectorArray from '../../common/querySelectorArray';

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

export default function fixFolders() {
  const theBackpack = getBackpack();
  if (theBackpack) { monkeyBp(theBackpack, doFix); }
}
