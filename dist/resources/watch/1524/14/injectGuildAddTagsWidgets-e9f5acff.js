import { A as getElementById, cn as injectGuild, k as insertHtmlBeforeEnd, M as querySelectorArray, Z as clickThis, B as setText, u as partial, aI as cdn, g as getElementsByTagName, p as pCC, i as insertElement, o as onclick } from './calfSystem-43606e5e.js';
import { c as createInput } from './createInput-1638e841.js';
import { g as guildInventory } from './guildInventory-1e2977e5.js';

function takeitem(invId) {
  return guildInventory({
    subcmd2: 'takeitem',
    guildstore_id: invId,
  });
}

// import { $dataAccess } from './_dataAccess';

function daGsTake(invId) {
  // return $dataAccess(takeitem, gsTake, invId);
  return takeitem(invId);
}

function doItemTable(checkbox) {
  insertHtmlBeforeEnd(checkbox.parentNode.nextElementSibling
    .nextElementSibling, '&nbsp;<span class="sendLink">Fast BP</span>');
}

function doCheckAll() {
  querySelectorArray('#pCC input[name="tagIndex[]"]').forEach(clickThis);
}

function takeResult(target, data) {
  if (data.s) {
    target.removeAttribute('style');
    // eslint-disable-next-line no-param-reassign
    target.className = 'fshGreen';
    setText('Taken', target);
  }
}

function fastBp(el) {
  const itmId = el.parentNode.previousElementSibling.previousElementSibling
    .children[0].value;
  daGsTake(itmId).then(partial(takeResult, el));
  setText('', el);
  // eslint-disable-next-line no-param-reassign
  el.className = 'guildTagSpinner';
  // eslint-disable-next-line no-param-reassign
  el.style.backgroundImage = `url('${cdn
  }ui/misc/spinner.gif')`;
}

function evtHdlr(e) {
  const { target } = e;
  if (target.value === 'Check All') { doCheckAll(); }
  if (target.className === 'sendLink') { fastBp(target); }
}

function paintTable() {
  querySelectorArray('#pCC input[name="tagIndex[]"]').forEach(doItemTable);
}

function checkAllBtn() {
  const checkAll = createInput({ type: 'button', value: 'Check All' });
  const formTags = getElementsByTagName('form', pCC);
  if (formTags.length === 1) {
    insertElement(formTags[0].previousElementSibling.cells[0], checkAll);
  }
}

function doItemTagging() {
  onclick(pCC, evtHdlr);
  paintTable();
  checkAllBtn();
}

function injectGuildAddTagsWidgets() {
  if (getElementById('tagging_cost')) {
    doItemTagging();
  } else {
    injectGuild();
  }
}

export default injectGuildAddTagsWidgets;
//# sourceMappingURL=injectGuildAddTagsWidgets-e9f5acff.js.map
