import arrayFrom from '../../common/arrayFrom';
import containsText from '../../common/containsText';
import dataRows from '../../common/dataRows';
import getText from '../../common/getText';
import hasClass from '../../common/hasClass';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import onclick from '../../common/onclick';
import openQuickBuffByName from '../../common/openQuickBuffByName';

function buffIndividual(target) {
  if (target.previousElementSibling) {
    openQuickBuffByName(getText(target.previousElementSibling));
  }
}

function memberName(el) { return getText(el.cells[0].children[0].children[0]); }

function buffAll(target) {
  const titanTable = target.parentNode.parentNode.parentNode.parentNode;
  const shortList = dataRows(titanTable.rows, 3, 0).map(memberName);
  openQuickBuffByName(shortList.join());
}

function buffEvent(e) {
  const { target } = e;
  if (containsText('[b]', target)) {
    buffIndividual(target);
  }
  if (containsText('all', target)) {
    buffAll(target);
  }
}

function evtHdl(e) {
  if (hasClass('fshBl', e.target)) { buffEvent(e); }
}

function playerBufflink(el) {
  insertHtmlBeforeEnd(el.cells[0],
    ' <button class="fshBl fshXSmall">[b]</button>');
}

function doBuffLinks(titanTable) {
  dataRows(titanTable.rows, 3, 0).forEach(playerBufflink);
  insertHtmlBeforeEnd(titanTable.rows[0].cells[0],
    ' <button class="fshBl fshXSmall">all</button>');
}

function myTables(el, i) { return el.rows.length > 1 && i > 1; }

function gotTables(titanTables) {
  arrayFrom(titanTables).filter(myTables).forEach(doBuffLinks);
  onclick(titanTables[1], evtHdl);
}

export default function injectScouttowerBuffLinks(titanTables) {
  if (titanTables.length > 2) { gotTables(titanTables); }
}
