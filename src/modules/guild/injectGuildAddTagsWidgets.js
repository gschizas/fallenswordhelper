import clickThis from '../common/clickThis';
import {createInput} from '../common/cElement';
import {getElementById} from '../common/getElement';
import getElementsByTagName from '../common/getElementsByTagName';
import {imageServer} from '../system/system';
import injectGuild from './guild';
import insertElement from '../common/insertElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import on from '../common/on';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import querySelectorArray from '../common/querySelectorArray';
import setText from '../common/setText';
import takeitem from '../app/guild/inventory/takeitem';

function doItemTable(checkbox) {
  insertHtmlBeforeEnd(checkbox.parentNode.nextElementSibling
    .nextElementSibling, '&nbsp;<span class="sendLink">Fast BP</span>');
}

function doCheckAll() {
  querySelectorArray('#pCC input[name="tagIndex[]"]').forEach(clickThis);
}

function takeResult(self, data) {
  if (data.s) {
    self.removeAttribute('style');
    self.className = 'fshGreen';
    setText('Taken', self);
  }
}

function fastBp(el) {
  var itmId = el.parentNode.previousElementSibling.previousElementSibling
    .children[0].value;
  takeitem(itmId).done(partial(takeResult, el));
  setText('', el);
  el.className = 'guildTagSpinner';
  el.style.backgroundImage = 'url(\'' + imageServer +
    '/skin/loading.gif\')';
}

function evtHdlr(e) {
  var self = e.target;
  if (self.value === 'Check All') {doCheckAll();}
  if (self.className === 'sendLink') {fastBp(self);}
}

function paintTable() {
  querySelectorArray('#pCC input[name="tagIndex[]"]').forEach(doItemTable);
}

function checkAllBtn() {
  var checkAll = createInput({type: 'button', value: 'Check All'});
  var formTags = getElementsByTagName('form', pCC);
  if (formTags.length === 1) {
    insertElement(formTags[0].previousElementSibling.cells[0], checkAll);
  }
}

function doItemTagging() {
  on(pCC, 'click', evtHdlr);
  paintTable();
  checkAllBtn();
}

export default function injectGuildAddTagsWidgets() {
  if (getElementById('tagging_cost')) {
    doItemTagging();
  } else {
    injectGuild();
  }
}
