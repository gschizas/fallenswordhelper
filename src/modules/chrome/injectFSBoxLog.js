import {createSpan} from '../common/cElement';
import {getElementById} from '../common/getElement';
import getForage from '../ajax/getForage';
import getValue from '../system/getValue';
import {injectFsBoxContent} from '../misc';
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
  var fsbox = getElementById('minibox-fsbox')
    .getElementsByClassName('message')[0].innerHTML;
  if (boxList.indexOf(fsbox) < 0) {boxList = '<br>' + fsbox + boxList;}
  if (boxList.length > 10000) {boxList = boxList.substring(0, 10000);}
  setForage('fsh_fsboxcontent', boxList);
}

function fSBoxExists(node) { // jQuery.min
  var nodediv = node.lastElementChild;
  var playerName = nodediv.getElementsByTagName('a');
  if (playerName.length === 0) {return;}
  getForage('fsh_fsboxcontent').done(storeFSBox);
  playerName = playerName[0].textContent;
  insertHtmlBeforeEnd(nodediv,
    '<br><span class="fshPaleVioletRed">' +
    '[ <a href="index.php?cmd=log&subcmd=doaddignore&ignore_username=' +
    playerName + '">Ignore</a> ]</span> ');
  var log = createSpan({
    className: 'fshYellow',
    innerHTML: '[ <span class="fshLink">Log</span> ]'
  });
  on(log, 'click', function() {
    sendEvent('injectFSBoxLog', 'injectFsBoxContent');
    jQueryDialog(injectFsBoxContent);
  });
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
