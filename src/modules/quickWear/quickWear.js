import {createDiv} from '../common/cElement';
import createQuickWear from './createQuickWear';
import loadInventory from '../app/profile/loadInventory';
import showAHInvManager from './showAHInvManager';
import toggleForce from '../common/toggleForce';
import {equipItem, useItem} from '../support/ajax';
import * as layout from '../support/layout';

var content;
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
  itemList.result.forEach(function(aFolder) {
    var thisFolder = aFolder.id;
    aFolder.items.forEach(function(o) {
      var tr = o.dom;
      if (folderId === '0') {
        tr.classList.remove('fshHide');
      } else {
        var force = folderId !== thisFolder.toString();
        toggleForce(tr, force);
      }
    });
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

function showQuickWear(appInv) {
  itemList = appInv;
  var invTabs = createInvTabs();
  var invTabsQw = createQuickWear(appInv);
  invTabs.appendChild(invTabsQw);
  content.innerHTML = '';
  content.appendChild(invTabs);
  invTabsQw.addEventListener('click', listen);
  invTabs.appendChild(showAHInvManager(appInv));
}

export default function insertQuickWear(injector) {
  content = injector || layout.pCC;
  if (!content) {return;}
  content.insertAdjacentHTML('beforeend', 'Getting item list from backpack...');
  loadInventory().done(showQuickWear);
}
