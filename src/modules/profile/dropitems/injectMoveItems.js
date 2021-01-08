import MoveItems from './MoveItems.svelte';
import chunk from '../../common/chunk';
import closestTable from '../../common/closestTable';
import closestTr from '../../common/closestTr';
import daSendToFolder from '../../_dataAccess/daSendToFolder';
import getCheckedItems from './getCheckedItems';
import partial from '../../common/partial';
import querySelectorArray from '../../common/querySelectorArray';
import removeRow from './removeRow';

async function moveList(folderId, list) {
  const json = await daSendToFolder(folderId, list.map((c) => c.value));
  if (json.s) {
    list.forEach(removeRow);
  }
}

function moveItemsToFolder(e) {
  chunk(30, getCheckedItems()).forEach(partial(moveList, e.detail));
}

export default function injectMoveItems() {
  const folders = querySelectorArray('#pCC img[src$="/folder.png"]');
  if (folders.length === 0) { return; }
  const flrRow = closestTr(closestTable(folders[0]));
  const app = new MoveItems({
    anchor: flrRow.nextElementSibling,
    props: { folders },
    target: flrRow.parentNode,
  });
  app.$on('move', moveItemsToFolder);
}
