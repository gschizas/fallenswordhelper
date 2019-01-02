import {createSpan} from '../common/cElement';
import {getElementById} from '../common/getElement';
import getElementsByClassName from '../common/getElementsByClassName';
import insertElement from '../common/insertElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import on from '../common/on';

function profileSelectAll() {
  var bpTabs = getElementById('backpack_tabs');
  var type = getElementsByClassName('tab-selected', bpTabs)[0]
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
  on(allSpan, 'click', profileSelectAll);
  var wrapper = createSpan({innerHTML: '[&nbsp;'});
  insertElement(wrapper, allSpan);
  insertHtmlBeforeEnd(wrapper, '&nbsp;]&nbsp;');
  insertElement(node.parentNode, wrapper);
}
