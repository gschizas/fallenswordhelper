import componentDeleteHandler from './componentDeleteHandler';
import countComponentHandler from './countComponentHandler';
import {createDiv} from '../../common/cElement';
import decorateButton from './decorateButton';
import deleteTypeHandler from './deleteTypeHandler';
import eventHandler3 from '../../common/eventHandler3';
import getInvTable from './getInvTable';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import insertQuickExtract from '../../quickExtract';
import jQueryDialog from '../../chrome/jQueryDialog';
import on from '../../common/on';
import {sendEvent} from '../../support/fshGa';

function componentBtnContainer() {
  var cmDiv = createDiv({className: 'fshCenter'});
  ['Enable Quick Del', 'Count Components', 'Quick Extract Components'
  ].forEach(function(el) {
    insertElement(cmDiv, decorateButton(el));
  });
  return cmDiv;
}

function quickExtractHandler(evt) {
  if (evt.target.classList.contains('quick-extract-components')) {
    sendEvent('components', 'insertQuickExtract');
    jQueryDialog(insertQuickExtract);
    return true;
  }
}

function addDelBtn(el) {
  insertHtmlBeforeEnd(el.parentNode.parentNode,
    '<span class="compDelBtn">Del</span>');
}

function enableDelComponent(self) {
  sendEvent('components', 'enableDelComponent');
  var quickDelDiv = self.parentNode;
  quickDelDiv.classList.add('fshHide');
  var cmDiv = quickDelDiv.parentNode;
  insertElement(cmDiv, decorateButton('Delete All Visible'));
  var nodeList = getInvTable().getElementsByTagName('IMG');
  Array.from(nodeList).forEach(addDelBtn);
}

function enableQuickDelHandler(evt) {
  if (evt.target.classList.contains('enable-quick-del')) {
    enableDelComponent(evt.target);
    return true;
  }
}

function delAllComponent(self) {
  sendEvent('components', 'delAllComponent');
  var thisInvTable = self.parentNode.parentNode.parentNode.children[0];
  var nodeList = thisInvTable.getElementsByClassName('compDelBtn');
  Array.from(nodeList).forEach(function(el) {
    el.click();
  });
}

function deleteAllHandler(evt) {
  if (evt.target.classList.contains('delete-all-visible')) {
    delAllComponent(evt.target);
    return true;
  }
}

function addComposingButtons(thisInvTable) {
  var compDiv = thisInvTable.parentNode;
  insertElement(compDiv, componentBtnContainer());
  on(compDiv, 'click', eventHandler3([
    quickExtractHandler,
    enableQuickDelHandler,
    deleteAllHandler,
    componentDeleteHandler,
    countComponentHandler,
    deleteTypeHandler
  ]));
}

export default function components() {
  var thisInvTable = getInvTable();
  if (!thisInvTable) {return;}
  addComposingButtons(thisInvTable);
}
