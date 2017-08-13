import makeFolderSpans from '../common/makeFolderSpans';
import showAHInvManager from './showAHInvManager';
import toggleForce from '../common/toggleForce';
import {createDiv, createTBody, createTable} from '../common/cElement';
import {equipItem, useItem} from '../support/ajax';
import * as layout from '../support/layout';

var itemList;

function doUseItem(self) { // jQuery.min
  var invId = self.dataset.itemid;
  useItem(invId).done(function(data) {
    if (data.r !== 0) {return;}
    self.parentNode.innerHTML = '<span class="fastWorn">Used</span>';
  });
}

function useProfileInventoryItem(self) {
  layout.confirm('Use/Extract Item',
    'Are you sure you want to use/extract the item?',
    doUseItem.bind(null, self)
  );
}

function equipProfileInventoryItem(self) { // jQuery.min
  var invId = self.dataset.itemid;
  equipItem(invId).done(function(data) {
    if (data.r !== 0) {return;}
    self.parentNode.innerHTML = '<span class="fastWorn">Worn</span>';
  });
}

function hideFolders(self) {
  var folderId = self.dataset.folder;
  itemList.forEach(function(o) {
    var tr = o.dom;
    if (folderId === '0') {
      tr.classList.remove('fshHide');
    } else {
      var force = folderId !== o.f.toString();
      toggleForce(tr, force);
    }
  });
}

var evts = [
  {
    condition: function(self) {
      return self.classList.contains('smallLink') &&
        self.classList.contains('fshEq');
    },
    result: equipProfileInventoryItem
  },
  {
    condition: function(self) {
      return self.classList.contains('smallLink') &&
        self.classList.contains('fshUse');
    },
    result: useProfileInventoryItem
  },
  {
    condition: function(self) {return self.classList.contains('folder');},
    result: hideFolders
  }
];

function listen(evt) {
  var self = evt.target;
  evts.some(function(el) {
    if (el.condition(self)) {
      el.result(self);
      return true;
    }
    return false;
  });

}

function alpha(a, b) {
  if (a.n.toLowerCase() < b.n.toLowerCase()) {return -1;}
  if (a.n.toLowerCase() > b.n.toLowerCase()) {return 1;}
  return 0;
}

function folder(a, b) {
  if (a.f === b.f) {
    return alpha(a, b);
  }
  return a.f - b.f;
}

function tableRows(tbl, item) {
  var newRow = tbl.insertRow(-1);
  item.dom = newRow;
  var equipClass = 'fshEq ';
  var useClass = 'fshUse ';
  if (item.eq) {equipClass += 'smallLink';} else {equipClass += 'notLink';}
  if (item.u) {useClass += 'smallLink';} else {useClass += 'notLink';}
  newRow.innerHTML = '<td class="fshCenter"><span class="' + equipClass +
  '" data-itemid="' + item.a + '">Wear</span>&nbsp;|&nbsp;<span class="' +
  useClass + '" data-itemid="' + item.a +
  '">Use/Ext</span></td><td><img src="' + item.src +
  '" class="tip-dynamic" data-tipped="' + item.tip +
  '" width="30" height="30" border="0"></td><td width="90%">&nbsp;' +
  item.n + '</td>';
}

function createQuickWear(folders) {
  var tbl = createTable({
    width: '100%',
    innerHTML: '<thead><tr><th class="fshCenter" colspan="3">' +
      makeFolderSpans(folders) + '</th></tr>' +
      '<tr class="fshHeader"><th class="fshCenter" width="20%">Actions</th>' +
      '<th colspan="2">Items</th></tr></thead>'
  });
  var tbody = createTBody();
  tbl.appendChild(tbody);
  itemList.forEach(tableRows.bind(null, tbody));
  var qw = createDiv({
    id: 'invTabs-qw',
    className: 'ui-tabs-panel ui-corner-bottom'
  });
  qw.appendChild(tbl);
  return qw;
}

function createInvTabs() {
  return createDiv({
    id: 'invTabs',
    className: 'ui-tabs ui-widget-content ui-corner-all',
    innerHTML: '<input id="tab1" type="radio" name="tabs" checked>' +
      '<input id="tab2" type="radio" name="tabs">' +
      '<ul class="ui-tabs-nav ui-helper-reset ' +
        'ui-helper-clearfix ui-widget-header ui-corner-all">' +
      '<li class="ui-state-default ui-corner-top inv-tabs-qw">' +
      '<label for="tab1">Quick Wear / Use / Extract<br>Manager</label>' +
      '</li>' +
      '<li class="ui-state-default ui-corner-top inv-tabs-ah">' +
      '<label for="tab2">Inventory Manager Counter' +
        '<br>filtered by AH Quick Search</label>' +
      '</li></ul>'
  });
}

export default function showQuickWear(content, data, folders) {
  itemList = data;
  itemList.sort(folder);
  var invTabs = createInvTabs();
  var invTabsQw = createQuickWear(folders);
  invTabs.appendChild(invTabsQw);
  content.innerHTML = '';
  content.appendChild(invTabs);
  invTabsQw.addEventListener('click', listen);
  invTabs.appendChild(showAHInvManager(itemList));
}
