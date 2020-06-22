import CheckAll from './CheckAll.svelte';
import FolderFilter from './FolderFilter.svelte';
import arrayFrom from '../../../common/arrayFrom';
import batch from '../../../common/batch';
import closestTr from '../../../common/closestTr';
import getCheckboxes from './getCheckboxes';
import getInv from './getInv';
import getValue from '../../../system/getValue';
import getVisibleCheckboxes from './getVisibleCheckboxes';
import injectStoreItems from './injectStoreItems';
import jQueryPresent from '../../../common/jQueryPresent';
import partial from '../../../common/partial';
import toggleForce from '../../../common/toggleForce';

function updateList(inv, id, ctx) {
  ctx.checked = false;
  const tr = closestTr(ctx);
  const folder = inv.items[ctx.value].folder_id;
  const force = id !== -2 && id !== folder;
  toggleForce(tr, force);
  toggleForce(tr.nextElementSibling, force);
}

function doFilter(inv, e) {
  batch([
    5,
    3,
    getCheckboxes(),
    0,
    partial(updateList, inv, Number(e.detail)),
  ]);
}

async function doFolders() {
  const inv = await getInv();
  if (!inv || !inv.folders) { return; }
  const form = document.forms[0];
  const folderFilter = new FolderFilter({
    anchor: form,
    props: { inv },
    target: form.parentNode,
  });
  folderFilter.$on('filter', partial(doFilter, inv));
}

function doCheckAll() {
  getVisibleCheckboxes()
    .forEach((ctx) => { ctx.checked = !ctx.disabled && !ctx.checked; });
}

function addCheckAll() {
  const submitButton = arrayFrom(document.forms[0].elements).filter((e) => e.type === 'submit')[0];
  const checkAll = new CheckAll({
    anchor: submitButton,
    target: submitButton.parentNode,
  });
  checkAll.$on('checkall', doCheckAll);
}

export default function storeitems() {
  if (jQueryPresent() && getValue('enableFolderFilter')) { doFolders(); }
  addCheckAll();
  injectStoreItems();
}
