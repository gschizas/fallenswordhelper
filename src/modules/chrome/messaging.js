import classHandler from '../common/classHandler';
import fallback from '../system/fallback';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import getValueJSON from '../system/getValueJSON';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import on from '../common/on';
import setValueJSON from '../system/setValueJSON';

var enterForSendMessage;
var quickMsgDialog;
var $quickMessageDialog;
var fshTemplate;
var msgTbl;
var sendMessage;
var targetPlayer;
var dialogMsg;
var validateTips;
var showingTemplates;

function getQuickMessageDialog() { // jQuery
  if (!quickMsgDialog) {
    quickMsgDialog = getElementById('quickMessageDialog');
  }
  if (!$quickMessageDialog) {
    $quickMessageDialog = $(quickMsgDialog);
  }
}

function getTable() {
  if (!msgTbl) {
    msgTbl = quickMsgDialog.lastElementChild;
  }
}

function setName(name) {
  targetPlayer = name;
  getElementById('quickMsgDialog_targetUsername').textContent = name;
}

function setMsg(msg) {
  dialogMsg = getElementById('quickMsgDialog_msg');
  dialogMsg.value = fallback(msg, '');
  dialogMsg.disabled = false;
}

function keypress(evt) {
  if (evt.key === 'Enter' && !evt.shiftKey) {
    evt.preventDefault();
    sendMessage();
  }
}

function captureEnter() {
  if (enterForSendMessage) {
    on(dialogMsg, 'keypress', keypress);
  }
}

function getValidateTips() {
  if (!validateTips) {
    var nodes = quickMsgDialog.getElementsByClassName('validateTips');
    if (nodes.length === 1) {
      validateTips = nodes[0];
    }
  }
}

function doValidateTip(text) {
  getValidateTips();
  if (validateTips) {
    validateTips.textContent = text;
  }
}

function addRow(index, myBtn, html) {
  var newRow = msgTbl.insertRow(index);
  var newCell = newRow.insertCell(-1);
  insertHtmlBeforeEnd(newCell, myBtn);
  newCell = newRow.insertCell(-1);
  insertHtmlBeforeEnd(newCell, html);
}

function fshButton(classPrefix, label) {
  return '<button class="fshButton ui-corner-all ' + classPrefix +
    '-button">' + label + '</button>';
}

function addTemplateRow(index, text) {
  addRow(index, fshButton('del', 'Del'),
    '<span class="ui-widget-content fshBlck add-template">' +
    text + '</span>');
}

function deleteTemplate(self) {
  var myRow = self.parentNode.parentNode.rowIndex;
  msgTbl.deleteRow(myRow);
  fshTemplate.splice(myRow - 2, 1);
  setValueJSON('quickMsg', fshTemplate);
}

function addNewTemplate(self) {
  var templateInput = self.parentNode.nextElementSibling.children[0];
  var templateValue = templateInput.value;
  if (templateValue !== '') {
    var myRow = self.parentNode.parentNode.rowIndex;
    addTemplateRow(myRow, templateValue);
    templateInput.value = '';
    fshTemplate.push(templateValue);
    setValueJSON('quickMsg', fshTemplate);
  }
}

function insertTemplate(self) {
  dialogMsg.value += self.textContent
    .replace(/\{playername\}/g, targetPlayer) + '\n';
}

var classEvents = [
  ['del-button', deleteTemplate],
  ['add-button', addNewTemplate],
  ['add-template', insertTemplate],
];

function showMsgTemplate() {
  if (!showingTemplates) {
    getTable();
    fshTemplate.forEach(function(text) {
      addTemplateRow(-1, text);
    });
    addRow(-1,
      fshButton('add', 'Add'),
      '<input id="newTmpl" class="ui-widget-content fshTmpl">');
    showingTemplates = true;
    on(msgTbl, 'click', classHandler(classEvents));
  }
}

function getFshTemplate() { // jQuery
  if (!fshTemplate) {
    fshTemplate = getValueJSON('quickMsg');
    var buttons = $quickMessageDialog.dialog('option', 'buttons');
    sendMessage = buttons['Send Message'];
  }
}

function openQuickMsgDialog(name, msg, tip) { // jQuery
  getQuickMessageDialog();
  getFshTemplate();
  showMsgTemplate();
  setName(name);
  setMsg(msg);
  captureEnter();
  doValidateTip(fallback(tip, ''));
  $quickMessageDialog.dialog('open');
}

export default function injectQuickMsgDialogJQ() {
  if (jQueryNotPresent()) {return;}
  enterForSendMessage = getValue('enterForSendMessage');
  window.openQuickMsgDialog = openQuickMsgDialog;
}
