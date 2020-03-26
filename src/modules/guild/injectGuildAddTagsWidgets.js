import {cdn} from '../system/system';
import clickThis from '../common/clickThis';
import {createInput} from '../common/cElement';
import {daGsTake} from '../_dataAccess/_dataAccess';
import {getElementById} from '../common/getElement';
import getElementsByTagName from '../common/getElementsByTagName';
import injectGuild from './guild';
import insertElement from '../common/insertElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import on from '../common/on';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import querySelectorArray from '../common/querySelectorArray';
import setText from '../common/setText';

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
    target.className = 'fshGreen';
    setText('Taken', target);
  }
}

function fastBp(el) {
  var itmId = el.parentNode.previousElementSibling.previousElementSibling
    .children[0].value;
  daGsTake(itmId).then(partial(takeResult, el));
  setText('', el);
  el.className = 'guildTagSpinner';
  el.style.backgroundImage = 'url(\'' + cdn +
    'ui/misc/spinner.gif\')';
}

function evtHdlr(e) {
  var target = e.target;
  if (target.value === 'Check All') {doCheckAll();}
  if (target.className === 'sendLink') {fastBp(target);}
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
