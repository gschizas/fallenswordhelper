import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import openQuickBuffByName from '../common/openQuickBuffByName';

function buffIndividual(self) {
  if (self.previousElementSibling) {
    openQuickBuffByName(self.previousElementSibling.textContent);
  }
}

function buffAll(self) {
  var titanTable = self.parentNode.parentNode.parentNode.parentNode;
  var shortList = [];
  for (var j = 1; j < titanTable.rows.length; j += 2) {
    var firstCell = titanTable.rows[j].cells[0].firstChild.firstChild;
    shortList.push(firstCell.textContent);
  }
  openQuickBuffByName(shortList.join());
}

function buffEvent(e) {
  var self = e.target;
  if (self.textContent === '[b]') {
    buffIndividual(self);
  }
  if (self.textContent === 'all') {
    buffAll(self);
  }
}

function evtHdl(e) {
  if (e.target.classList.contains('fshBl')) {buffEvent(e);}
}

function doBuffLinks(titanTable) {
  for (var j = 1; j < titanTable.rows.length; j += 2) {
    var firstCell = titanTable.rows[j].cells[0];
    insertHtmlBeforeEnd(firstCell,
      ' <button class="fshBl fshXSmall">[b]</button>');
  }
  insertHtmlBeforeEnd(titanTable.rows[0].cells[0],
    ' <button class="fshBl fshXSmall">all</button>');
}

function gotTables(titanTables) {
  for (var i = 2; i < titanTables.length; i += 1) {
    var titanTable = titanTables[i];
    if (titanTable.rows.length < 2) {continue;}
    doBuffLinks(titanTable);
  }
  titanTables[1].addEventListener('click', evtHdl);
}

export default function injectScouttowerBuffLinks(titanTables) {
  if (titanTables.length > 2) {gotTables(titanTables);}
}
