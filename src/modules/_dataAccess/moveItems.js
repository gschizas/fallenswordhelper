import moveItem from '../ajax/moveItem';

export default function moveItems(folderId, itemsAry) {
  return moveItem(itemsAry, folderId).then(() => ({r: itemsAry}));
}
