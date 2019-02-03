import classHandler from '../../common/classHandler';
import clickThis from '../../common/clickThis';
import countComponent from './countComponent';
import {createDiv} from '../../common/cElement';
import decorateButton from './decorateButton';
import delCompType from './delCompType';
import delComponent from './delComponent';
import getArrayByClassName from '../../common/getArrayByClassName';
import getArrayByTagName from '../../common/getArrayByTagName';
import getInvTable from './getInvTable';
import hideElement from '../../common/hideElement';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import insertQuickExtract from '../../notepad/quickExtract/quickExtract';
import jQueryDialog from '../../chrome/jQueryDialog';
import on from '../../common/on';
import {sendEvent} from '../../support/fshGa';

var buttonLabels = [
  'Enable Quick Del',
  'Count Components',
  'Quick Extract Components'
];

function addButtons(prev, el) {
  insertElement(prev, decorateButton(el));
  return prev;
}

function componentBtnContainer() {
  return buttonLabels.reduce(addButtons, createDiv({className: 'fshCenter'}));
}

function quickExtractHandler() {
  sendEvent('components', 'insertQuickExtract');
  jQueryDialog(insertQuickExtract);
}

function addDelBtn(el) {
  insertHtmlBeforeEnd(el.parentNode.parentNode,
    '<span class="compDelBtn">Del</span>');
}

function enableDelComponent(self) {
  sendEvent('components', 'enableDelComponent');
  var quickDelDiv = self.parentNode;
  hideElement(quickDelDiv);
  var cmDiv = quickDelDiv.parentNode;
  insertElement(cmDiv, decorateButton('Delete All Visible'));
  getArrayByTagName('img', getInvTable()).forEach(addDelBtn);
}

function delAllComponent(self) {
  sendEvent('components', 'delAllComponent');
  var thisInvTable = self.parentNode.parentNode.parentNode.children[0];
  getArrayByClassName('compDelBtn', thisInvTable).forEach(clickThis);
}

var classEvts = [
  ['quick-extract-components', quickExtractHandler],
  ['enable-quick-del', enableDelComponent],
  ['delete-all-visible', delAllComponent],
  ['compDelBtn', delComponent],
  ['count-components', countComponent],
  ['compDelType', delCompType]
];

function addComposingButtons(thisInvTable) {
  var compDiv = thisInvTable.parentNode;
  insertElement(compDiv, componentBtnContainer());
  on(compDiv, 'click', classHandler(classEvts));
}

export default function components() {
  var thisInvTable = getInvTable();
  if (!thisInvTable) {return;}
  addComposingButtons(thisInvTable);
}
