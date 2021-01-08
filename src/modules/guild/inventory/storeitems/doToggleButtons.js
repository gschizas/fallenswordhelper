import ToggleButtons from './ToggleButtons.svelte';
import getCheckboxesVisible from './getCheckboxesVisible';
import getInv from './getInv';
import updateDomItems from './updateDomItems';
import { showExtraLinks, showQuickDropLinks } from './constants';

function makeToggleButtons(prefs) {
  const form = document.forms[0];
  return new ToggleButtons({
    props: {
      showExtraLinks: prefs[showExtraLinks],
      showQuickDropLinks: prefs[showQuickDropLinks],
    },
    target: form.parentNode.children[5].children[0],
  });
}

async function selectLocked() {
  const visibleCheckboxes = getCheckboxesVisible();
  if (!visibleCheckboxes.length) { return; }
  const inv = await getInv();
  if (!inv || !inv.items) { return; }
  visibleCheckboxes
    .map((cb) => [cb, inv.items[cb.value]])
    .filter(([, invItem]) => invItem)
    .forEach(([e, invItem]) => {
      e.checked = !e.disabled && invItem.guild_tag !== -1;
    });
}

export default function doToggleButtons(ctx) {
  const toggleButtons = makeToggleButtons(ctx);
  toggleButtons.$on('showExtraLinks', (e) => {
    ctx[showExtraLinks] = e.detail;
    updateDomItems(ctx);
  });
  toggleButtons.$on('showQuickDropLinks', (e) => {
    ctx[showQuickDropLinks] = e.detail;
    updateDomItems(ctx);
  });
  toggleButtons.$on('selectLocked', () => {
    selectLocked();
  });
}
