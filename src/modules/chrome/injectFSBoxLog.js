import {createSpan} from '../common/cElement';
import {doAddIgnore} from '../support/constants';
import {getElementById} from '../common/getElement';
import getElementsByClassName from '../common/getElementsByClassName';
import getElementsByTagName from '../common/getElementsByTagName';
import getForage from '../ajax/getForage';
import getText from '../common/getText';
import getValue from '../system/getValue';
import injectFsBoxContent from '../notepad/injectFsBoxContent';
import insertElement from '../common/insertElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryDialog from './jQueryDialog';
import jQueryPresent from '../common/jQueryPresent';
import on from '../common/on';
import {sendEvent} from '../support/fshGa';
import setForage from '../ajax/setForage';

function getBoxList(boxList) {
  if (boxList) {return boxList;}
  return '';
}

function storeFSBox(_boxList) {
  var boxList = getBoxList(_boxList);
  var fsbox = getElementsByClassName('message',
    getElementById('minibox-fsbox'))[0].innerHTML;
  if (boxList.indexOf(fsbox) < 0) {boxList = '<br>' + fsbox + boxList;}
  if (boxList.length > 10000) {boxList = boxList.substring(0, 10000);}
  setForage('fsh_fsboxcontent', boxList);
}

function openDialog() {
  sendEvent('injectFSBoxLog', 'injectFsBoxContent');
  jQueryDialog(injectFsBoxContent);
}

function fSBoxExists(node) { // jQuery.min
  var nodediv = node.lastElementChild;
  var playerName = getElementsByTagName('a', nodediv);
  if (playerName.length === 0) {return;}
  getForage('fsh_fsboxcontent').done(storeFSBox);
  playerName = getText(playerName[0]);
  insertHtmlBeforeEnd(nodediv,
    '<br><span class="fshPaleVioletRed">[ <a href="' + doAddIgnore +
    playerName + '">Ignore</a> ]</span> ');
  var log = createSpan({
    className: 'fshYellow',
    innerHTML: '[ <span class="fshLink">Log</span> ]'
  });
  on(log, 'click', openDialog);
  insertElement(nodediv, log);
}

function findFsBox() {
  var node = getElementById('minibox-fsbox');
  if (jQueryPresent() && node) {fSBoxExists(node);}
}

export default function injectFSBoxLog() {
  if (!getValue('fsboxlog')) {return;}
  findFsBox();
}
