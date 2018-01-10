import eventHandler from '../common/eventHandler';
import {getElementById} from '../common/getElement';
import {infoBox} from '../support/layout';
import insertQuickExtract from '../quickExtract';
import jQueryDialog from '../chrome/jQueryDialog';
import retryAjax from '../ajax/retryAjax';
import {sendEvent} from '../support/fshGa';
import {
  createDiv,
  createSpan,
  createTBody,
  createTable
} from '../common/cElement';
import {createDocument, imageServer} from '../support/system';

var quickDelDiv;
var sumComp;
var delAllDiv;
var compDel;
var compSum;
var compDelAll;
var qe;
var thisInvTable;
var componentList = {};
var usedCount;
var usedCountDom;
var totalCount;
var pageCount;

function getInvTables(doc) {
  return getElementById('profileRightColumn', doc)
    .getElementsByClassName('inventory-table');
}

function tallyComponent(visible, el) {
  var mouseover = el.dataset.tipped;
  var id = mouseover.match(/fetchitem.php\?item_id=(\d+)/)[1];
  componentList[id] = componentList[id] || {
    count: 0,
    src: el.getAttribute('src'),
    onmouseover: mouseover,
    del: [],
    dom: []
  };
  componentList[id].count += 1;
  componentList[id].del.push(el.parentNode.href);
  if (visible) {componentList[id].dom.push(el.parentNode.parentNode);}
  usedCount += 1;
}

function retriveComponent(doc) {
  var visible = doc === document;
  var invTbl = getInvTables(doc)[1];
  var nodeList = invTbl.getElementsByTagName('IMG');
  Array.prototype.forEach.call(nodeList, tallyComponent.bind(null, visible));
  totalCount += invTbl.querySelectorAll(
    'td[background$="inventory/1x1mini.gif"]').length;
}

function tallyTableRow(prev, id) {
  var comp = componentList[id];
  return prev + '<tr><td><img src="' + comp.src +
    '" class="fshTblCenter tip-dynamic" data-tipped="' + comp.onmouseover +
    '"></td><td>' + comp.count + '</td>' +
    '<td>[<span class="sendLink compDelType" data-compid="' + id +
    '">Del</span>]</td></tr>';
}

function displayComponentTally() {
  var tbl = createTable({className: 'fshTblCenter'});
  var tBody = createTBody();
  tbl.appendChild(tBody);
  tBody.insertAdjacentHTML('beforeend',
    '<tr><td colspan="3">Component Summary</td></tr>' +
    Object.keys(componentList).reduce(tallyTableRow, ''));
  var totRow = tbl.insertRow(-1);
  totRow.insertAdjacentHTML('beforeend', '<td>Total:</td>');
  var totCell = totRow.insertCell(-1);
  totCell.colSpan = 2;
  usedCountDom = createSpan();
  usedCountDom.innerHTML = usedCount.toString();
  totCell.appendChild(usedCountDom);
  totCell.insertAdjacentText('beforeend', ' / ' + totalCount.toString());
  sumComp.innerHTML = '';
  sumComp.appendChild(tbl);
}

function gotComponentsPage(data) {
  pageCount += 1;
  sumComp.insertAdjacentHTML('beforeend', pageCount + ', ');
  retriveComponent(createDocument(data));
}

function countComponent(self) { // jQuery.min
  self.parentNode.innerHTML = 'Retrieve page: 1, ';
  usedCount = 0;
  totalCount = 0;
  pageCount = 1;
  var prm = [$.when(document).done(retriveComponent)];
  var lastRowIndex = thisInvTable.rows.length - 1;
  var pageLinks = thisInvTable.rows[lastRowIndex].firstChild.children;
  Array.prototype.forEach.call(pageLinks, function(el) {
    if (el.children.length === 0) {
      prm.push(retryAjax(el.href).done(gotComponentsPage));
    }
  });
  $.when.apply($, prm).done(displayComponentTally);
}

function delAllComponent() {
  var nodeList = thisInvTable.getElementsByClassName('compDelBtn');
  Array.prototype.forEach.call(nodeList, function(el) {
    el.click();
  });
}

function compDeleted(self, data) {
  var response = infoBox(data);
  if (response === 'Component destroyed.') {
    self.parentNode.innerHTML = '';
  } else {
    $('#dialog_msg').html(response).dialog('open');
  }
}

function delComponent(self) { // jQuery.min
  var href = self.previousElementSibling.href;
  retryAjax(href).done(compDeleted.bind(null, self));
}

function addDelBtn(el) {
  el.parentNode.parentNode.insertAdjacentHTML('beforeend',
    '<span class="compDelBtn">Del</span>');
}

function enableDelComponent() {
  quickDelDiv.classList.add('fshHide');
  delAllDiv.classList.remove('fshHide');
  var nodeList = thisInvTable.getElementsByTagName('IMG');
  Array.prototype.forEach.call(nodeList, addDelBtn);
}

function updateUsedCount() {
  usedCount -= 1;
  usedCountDom.textContent = usedCount.toString();
}

function delCompType(self) { // jQuery.min
  var id = self.dataset.compid;
  var td = self.parentNode;
  td.innerHTML = '';
  td.className = 'guildTagSpinner';
  td.style.backgroundImage = 'url(\'' + imageServer +
    '/skin/loading.gif\')';
  var prm = [];
  componentList[id].del.forEach(function(href) {
    prm.push(retryAjax(href).done(updateUsedCount));
  });
  $.when.apply($, prm).done(function() {
    componentList[id].dom.forEach(function(el) {el.innerHTML = '';});
    td.parentNode.remove();
  });
}

var evtHdl = [
  {
    test: function(self) {return self === compDel;},
    act: enableDelComponent
  },
  {
    test: function(self) {return self === compSum;},
    act: countComponent
  },
  {
    test: function(self) {return self === compDelAll;},
    act: delAllComponent
  },
  {
    test: function(self) {return self === qe;},
    act: function() {
      sendEvent('components', 'insertQuickExtract');
      jQueryDialog(insertQuickExtract);
    }
  },
  {
    test: function(self) {return self.classList.contains('compDelBtn');},
    act: delComponent
  },
  {
    test: function(self) {return self.classList.contains('compDelType');},
    act: delCompType
  }
];

function decorateButton(parentDiv, label) {
  var innerSpan = createSpan(
    {className: 'sendLink', textContent: label});
  parentDiv.textContent = '[';
  parentDiv.appendChild(innerSpan);
  parentDiv.insertAdjacentHTML('beforeend', ']');
  return innerSpan;
}

export default function profileComponents() {
  var invTables = getInvTables(document);
  if (invTables.length !== 2) {return;}
  thisInvTable = invTables[1];
  var compDiv = thisInvTable.parentNode;
  if (compDiv.style.display !== 'block') {return;}
  var cmDiv = createDiv({className: 'fshCenter'});
  quickDelDiv = createDiv();
  sumComp = createDiv();
  delAllDiv = createDiv({className: 'fshHide'});
  var qeDiv = createDiv();
  compDel = decorateButton(quickDelDiv, 'Enable Quick Del');
  compSum = decorateButton(sumComp, 'Count Components');
  compDelAll = decorateButton(delAllDiv, 'Delete All Visible');
  qe = decorateButton(qeDiv, 'Quick Extract Components');
  cmDiv.appendChild(quickDelDiv);
  cmDiv.appendChild(sumComp);
  cmDiv.appendChild(qeDiv);
  cmDiv.appendChild(delAllDiv);
  compDiv.appendChild(cmDiv);
  compDiv.addEventListener('click', eventHandler(evtHdl));
}
