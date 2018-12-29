import calf from '../../support/calf';
import draggable from '../../common/dragStart';
import getForage from '../../ajax/getForage';
import getValue from '../../system/getValue';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import on from '../../common/on';
import once from '../../common/once';
import partial from '../../common/partial';
import {sendEvent} from '../../support/fshGa';
import setValue from '../../system/setValue';
import {simpleCheckboxHtml} from '../../settings/simpleCheckbox';
import {
  createDiv,
  createInput,
  createTr,
  createUl
} from '../../common/cElement';
import {initTable, makeTg} from './trackerTable';
import {makeInOut, queueRawData} from './rawData';

var trackerData;
var tracker;
var trDialog;
var acttab2;

function isClosed() {
  return !tracker.checked;
}

function isOpen() {
  return tracker.checked;
}

function closeDialog() {
  tracker.checked = false;
}

function keydownHandler(evt) {
  if (isOpen() && evt.code === 'Escape') {
    closeDialog();
  }
}

function maybeClose(ret) {
  if (isClosed()) {ret.style.transform = null;}
}

function makeDragHandle() {
  return createUl({
    className: 'fshMove ui-tabs-nav ui-widget-header ui-corner-all ' +
      'ui-helper-reset ui-helper-clearfix',
    innerHTML: '<li class="ui-state-default ui-corner-top">' +
      '<label class="fsh-tab-label" for="acttab1">' +
      'Guild Activity Tracker</label></li>' +
      '<li class="ui-state-default ui-corner-top">' +
      '<label class="fsh-tab-label" for="acttab2">Import/Export</label></li>' +
      '<label for="tracker" class="fsh-dialog-close ' +
      'ui-dialog-titlebar-close">&times;</label>'
  });
}

function updateRawData() {
  sendEvent('guildTracker', 'updateRawData');
  if (trackerData) {queueRawData(trackerData);}
}

function makeInnerPopup() {
  var dialogPopup = createDiv({
    className: 'fsh-dialog-popup ' +
      'ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all',
    innerHTML: '<input id="acttab1" class="fsh-tab-open" ' +
      'name="acttabs" checked type="radio">'
  });
  acttab2 = createInput({
    className: 'fsh-tab-open',
    id: 'acttab2',
    name: 'acttabs',
    type: 'radio'
  });
  once(acttab2, 'change', updateRawData);
  insertElement(dialogPopup, acttab2);
  return dialogPopup;
}

function makeRet() {
  var ret = makeInnerPopup();
  var hdl = makeDragHandle();
  insertElement(ret, hdl);
  draggable(hdl, ret);
  return ret;
}

function makeContainer() {
  var container = createDiv({className: 'fsh-dialog-content'});
  insertElement(container, makeTg());
  insertElement(container, makeInOut());
  return container;
}

function makePopup() {
  var ret = makeRet();
  var container = makeContainer();
  insertElement(ret, container);
  on(tracker, 'change', partial(maybeClose, ret));
  insertElement(trDialog, ret);
}

function addOverlay() {
  insertHtmlBeforeEnd(trDialog,
    '<div class="fsh-dialog-overlay">' +
    '<label class="fsh-dialog-cancel" for="tracker"></label>' +
    '</div>');
}

function gotActivity(data) {
  if (data) {
    trackerData = JSON.stringify(data);
    initTable(data.members);
  }
}

function togglePref(evt) {
  if (evt.target.id === 'enableGuildActivityTracker') {
    setValue('enableGuildActivityTracker',
      !getValue('enableGuildActivityTracker'));
  }
}

function openDialog() {
  sendEvent('guildTracker', 'openDialog');
  getForage('fsh_guildActivity').done(gotActivity);
  calf.dialogIsClosed = isClosed;
  addOverlay();
  makePopup();
}

function makeCellOne(gs, newTr) {
  var cellOne = newTr.insertCell(-1);
  insertElement(cellOne, gs);
}

function makeCellTwo(newTr) {
  var cellTwo = newTr.insertCell(-1);
  cellTwo.innerHTML = simpleCheckboxHtml('enableGuildActivityTracker') +
    '&nbsp;<label class="custombutton" for="tracker">Show</label>';
}

function makeNewTr(gs) {
  var newTr = createTr();
  makeCellOne(gs, newTr);
  makeCellTwo(newTr);
  on(newTr, 'change', togglePref);
  return newTr;
}

function injectShowTracker() {
  var gs = document.querySelector('#pCC img.guild_openGuildStore');
  var oldTr = gs.parentNode.parentNode;
  oldTr.parentNode.replaceChild(makeNewTr(gs), oldTr);
}

function injectTracker() {
  tracker = createInput({
    id: 'tracker',
    className: 'fsh-dialog-open',
    type: 'checkbox'
  });
  once(tracker, 'change', openDialog);
  trDialog = createDiv({className: 'fsh-dialog'});
  insertElement(trDialog, tracker);
  on(document.body, 'keydown', keydownHandler);
  insertElement(document.body, trDialog);
}

export default function guildTracker() {
  injectShowTracker();
  injectTracker();
}
