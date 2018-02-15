import calf from '../../support/calf';
import draggable from '../../common/dragStart';
import getForage from '../../ajax/getForage';
import getValue from '../../system/getValue';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
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
  acttab2.removeEventListener('change', updateRawData);
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
  acttab2.addEventListener('change', updateRawData);
  dialogPopup.appendChild(acttab2);
  return dialogPopup;
}

function makePopup() {
  var ret = makeInnerPopup();
  var hdl = makeDragHandle();
  ret.appendChild(hdl);
  var container = createDiv({className: 'fsh-dialog-content'});
  container.appendChild(makeTg());
  container.appendChild(makeInOut());
  ret.appendChild(container);
  draggable(hdl, ret);
  trDialog.appendChild(ret);
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
  getForage('fsh_guildActivity').done(gotActivity);
  tracker.removeEventListener('change', openDialog);
  calf.dialogIsClosed = isClosed;
  addOverlay();
  makePopup();
}

export default function guildTracker() {
  var gs = document.querySelector('#pCC img.guild_openGuildStore');
  var oldTr = gs.parentNode.parentNode;
  var newTr = createTr();
  var cellOne = newTr.insertCell(-1);
  var cellTwo = newTr.insertCell(-1);
  cellOne.appendChild(gs);
  cellTwo.innerHTML = simpleCheckboxHtml('enableGuildActivityTracker') +
    '&nbsp;<label class="custombutton" for="tracker">Show</label>';
  newTr.addEventListener('change', togglePref);
  oldTr.parentNode.replaceChild(newTr, oldTr);
  tracker = createInput({
    id: 'tracker',
    className: 'fsh-dialog-open',
    type: 'checkbox'
  });
  tracker.addEventListener('change', openDialog);
  trDialog = createDiv({className: 'fsh-dialog'});
  trDialog.appendChild(tracker);
  document.body.addEventListener('keydown', keydownHandler);
  document.body.appendChild(trDialog);
}
