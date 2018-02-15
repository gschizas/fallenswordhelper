import {createSpan} from '../common/cElement';
import {getElementById} from '../common/getElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';

function profileSelectAll() {
  var bpTabs = getElementById('backpack_tabs');
  var type = bpTabs.getElementsByClassName('tab-selected')[0]
    .getAttribute('data-type');
  var items = document.querySelectorAll('#backpackTab_' + type +
    ' li:not(.hcsPaginate_hidden) .backpackItem');
  if (items.length === 0) {return;}
  var checkboxes = document.querySelectorAll('#backpackTab_' + type +
    ' li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)');
  if (checkboxes.length > 0) {items = checkboxes;}
  Array.prototype.forEach.call(items, function(el) {el.click();});
}

export default function selectAllLink() {
  // select all link
  var node = document.querySelector('#profileRightColumn' +
    ' a[href="index.php?cmd=profile&subcmd=dropitems"]');
  if (!node) {return;}
  var allSpan = createSpan({className: 'smallLink', textContent: 'All'});
  allSpan.addEventListener('click', profileSelectAll);
  var wrapper = createSpan({innerHTML: '[&nbsp;'});
  wrapper.appendChild(allSpan);
  insertHtmlBeforeEnd(wrapper, '&nbsp;]&nbsp;');
  node.parentNode.appendChild(wrapper);
}
