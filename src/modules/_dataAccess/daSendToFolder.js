// import { $dataAccess } from './_dataAccess';
// import moveItems from './fallbacks/moveItems';
import sendtofolder from '../app/profile/sendtofolder';

export default function daSendToFolder(folderId, itemsAry) {
  // return $dataAccess(sendtofolder, moveItems, folderId, itemsAry);
  return sendtofolder(folderId, itemsAry);
}
