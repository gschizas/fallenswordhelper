import callApp from '../callApp';

export default function sendtofolder(folderId, itemsAry) {
  return callApp({
    cmd: 'profile',
    subcmd: 'sendtofolder',
    folder_id: folderId,
    folderItem: itemsAry
  });
}
