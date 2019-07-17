import {arrayFrom} from '../../common/arrayFrom';
import containsText from '../../common/containsText';
import {dataRows} from '../../common/dataRows';
import getText from '../../common/getText';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import on from '../../common/on';
import openQuickBuffByName from '../../common/openQuickBuffByName';

function buffIndividual(self) {
  if (self.previousElementSibling) {
    openQuickBuffByName(getText(self.previousElementSibling));
  }
}

function memberName(el) {return getText(el.cells[0].children[0].children[0]);}

function buffAll(self) {
  var titanTable = self.parentNode.parentNode.parentNode.parentNode;
  var shortList = dataRows(titanTable.rows, 3, 0).map(memberName);
  openQuickBuffByName(shortList.join());
}

function buffEvent(e) {
  var self = e.target;
  if (containsText('[b]', self)) {
    buffIndividual(self);
  }
  if (containsText('all', self)) {
    buffAll(self);
  }
}

function evtHdl(e) {
  if (e.target.classList.contains('fshBl')) {buffEvent(e);}
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

function myTables(el, i) {return el.rows.length > 1 && i > 1;}

function gotTables(titanTables) {
  arrayFrom(titanTables).filter(myTables).forEach(doBuffLinks);
  on(titanTables[1], 'click', evtHdl);
}

export default function injectScouttowerBuffLinks(titanTables) {
  if (titanTables.length > 2) {gotTables(titanTables);}
}
