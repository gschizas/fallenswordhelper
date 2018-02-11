import add from '../support/task';
import calf from '../support/calf';
import draggable from '../common/dragStart';
import escapeHtml from '../system/escapeHtml';
import fallback from '../system/fallback';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import getValueJSON from '../system/getValueJSON';
import {imageServer} from '../system/system';

function retBool(bool, ifTrue, ifFalse) {
  if (bool) {
    return ifTrue;
  }
  return ifFalse;
}

function retOption(option, ifTrue, ifFalse) {
  return retBool(getValue(option), ifTrue, ifFalse);
}

function isDraggable(draggableQuickLinks) {
  if (draggableQuickLinks) {
    draggable(getElementById('fshQuickLinks'));
  }
}

function haveNode(node, quickLinks) { // Native ?
  var quickLinksTopPx = getValue('quickLinksTopPx');
  var quickLinksLeftPx = getValue('quickLinksLeftPx');
  var draggableQuickLinks = getValue('draggableQuickLinks');
  var draggableQuickLinksClass = retBool(draggableQuickLinks, ' fshMove', '');
  var html = '<div style="top:' + quickLinksTopPx + 'px; left:' +
    quickLinksLeftPx + 'px; background-image:url(\'' + imageServer +
    '/skin/inner_bg.jpg\');" id="fshQuickLinks" class="fshQuickLinks' +
    retOption('keepHelperMenuOnScreen', ' fshFixed', '') +
    draggableQuickLinksClass + '">';
  for (var i = 0; i < quickLinks.length; i += 1) {
    var newWindow = retBool(quickLinks[i].newWindow, ' target="new"', '');
    html += '<li><a href="' + escapeHtml(quickLinks[i].url) + '"' +
      newWindow + '>' + quickLinks[i].name + '</a></li>';
  }
  html += '</div>';
  document.body.insertAdjacentHTML('beforeend', html);
  isDraggable(draggableQuickLinks);
}

function injectQuickLinks() { // Native ?
  var node = getElementById('statbar-container');
  if (!node) {return;}
  var quickLinks = fallback(getValueJSON('quickLinks'), []);
  if (quickLinks.length <= 0) {return;}
  haveNode(node, quickLinks);
}

export default function doQuickLinks() {
  if (!calf.huntingMode) {
    add(3, injectQuickLinks);
  }
}
