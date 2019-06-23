import hasFailed from './hasFailed';
import moveItems from './moveItems';
import partial from '../common/partial';
import sendtofolder from '../app/profile/sendtofolder';

function doFallback(folderId, itemsAry) {
  return moveItems(folderId, itemsAry);
}

function fallback(folderId, itemsAry, json) {
  if (hasFailed(json)) {return doFallback(folderId, itemsAry);}
  return json;
}

export default function daSendToFolder(folderId, itemsAry) {
  return sendtofolder(folderId, itemsAry)
    .then(partial(fallback, folderId, itemsAry))
    .catch(partial(doFallback, folderId, itemsAry));
}
