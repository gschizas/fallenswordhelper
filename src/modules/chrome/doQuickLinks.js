import add from '../support/task';
import calf from '../support/calf';
import draggable from '../common/dragStart';
import escapeHtml from '../system/escapeHtml';
import getElementById from '../common/getElement';
import getValue from '../system/getValue';
import getValueJSON from '../system/getValueJSON';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';

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

function invalid(link) {
  return !('newWindow' in link) || !link.url || !link.name;
}

function linkHtml(link) {
  if (invalid(link)) { return ''; }
  const newWindow = retBool(link.newWindow, ' target="new"', '');
  return `<li><a href="${escapeHtml(link.url)}"${
    newWindow}>${link.name}</a></li>`;
}

function makeQuickLinks(quickLinks) {
  return quickLinks.map(linkHtml).join('');
}

function haveLinks(quickLinks) {
  const draggableQuickLinks = getValue('draggableQuickLinks');
  const html = `<div style="top:${getValue('quickLinksTopPx')}px; left:${
    getValue('quickLinksLeftPx')}px;" id="fshQuickLinks" `
    + `class="fshQuickLinks fshInnerBg${
      retOption('keepHelperMenuOnScreen', ' fshFixed', '')
    }${retBool(draggableQuickLinks, ' fshMove', '')}">${
      makeQuickLinks(quickLinks)}</div>`;
  insertHtmlBeforeEnd(document.body, html);
  isDraggable(draggableQuickLinks);
}

function haveNode() {
  const quickLinks = getValueJSON('quickLinks') || [];
  if (quickLinks.length > 0) { haveLinks(quickLinks); }
}

function injectQuickLinks() {
  const node = getElementById('statbar-container');
  if (node) { haveNode(); }
}

export default function doQuickLinks() {
  if (!calf.huntingMode) {
    add(3, injectQuickLinks);
  }
}
