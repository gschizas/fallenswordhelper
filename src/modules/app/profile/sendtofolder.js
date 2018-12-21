import postApp from '../postApp';

export default function sendtofolder(folderId, itemsAry) {
  return postApp({
    cmd: 'profile',
    subcmd: 'sendtofolder',
    folder_id: folderId,
    folderItem: itemsAry
  });
}
