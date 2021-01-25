import { D as querySelector, bV as dropItemsUrl, o as onclick, i as insertElement, f as insertHtmlBeforeEnd, y as getElementById, J as getElementsByClassName, E as querySelectorArray, R as clickThis } from './calfSystem-e64be67d.js';
import { c as createSpan } from './createSpan-e4d30c37.js';

function profileSelectAll() {
  const bpTabs = getElementById('backpack_tabs');
  const type = getElementsByClassName('tab-selected', bpTabs)[0]
    .getAttribute('data-type');
  let items = querySelectorArray(`#backpackTab_${type
  } li:not(.hcsPaginate_hidden) .backpackItem`);
  if (items.length === 0) { return; }
  const checkboxes = querySelectorArray(`#backpackTab_${type
  } li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`);
  if (checkboxes.length > 0) { items = checkboxes; }
  items.forEach(clickThis);
}

function selectAllLink() {
  // select all link
  const node = querySelector(`#profileRightColumn a[href="${
    dropItemsUrl}"]`);
  if (!node) { return; }
  const allSpan = createSpan({ className: 'smallLink', textContent: 'All' });
  onclick(allSpan, profileSelectAll);
  const wrapper = createSpan({ innerHTML: '[&nbsp;' });
  insertElement(wrapper, allSpan);
  insertHtmlBeforeEnd(wrapper, '&nbsp;]&nbsp;');
  insertElement(node.parentNode, wrapper);
}

export default selectAllLink;
//# sourceMappingURL=selectAllLink-a0bdc151.js.map
