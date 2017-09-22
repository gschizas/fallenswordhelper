import {createDiv} from '../common/cElement';
import createQuickWear from './createQuickWear';
import loadInventory from '../app/profile/loadInventory';
import showAHInvManager from './showAHInvManager';
import {simpleCheckboxHtml} from '../settings/settingsPage';
import toggleForce from '../common/toggleForce';
import {equipItem, useItem} from '../support/ajax';
import * as layout from '../support/layout';
import * as system from '../support/system';

var disableQuickWearPrompts;
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
  if (disableQuickWearPrompts) {
    doUseItem(self);
  } else {
    layout.confirm('Use/Extract Item',
      'Are you sure you want to use/extract the item?',
      doUseItem.bind(null, self)
    );
  }
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

function togglePref() {
  disableQuickWearPrompts = !disableQuickWearPrompts;
  system.setValue('disableQuickWearPrompts', disableQuickWearPrompts);
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
  },
  {
    condition: function(self) {return self.id === 'disableQuickWearPrompts';},
    result: togglePref
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
    innerHTML: '<input id="qwtab1" type="radio" name="qwtabs" checked>' +
      '<input id="qwtab2" type="radio" name="qwtabs">' +
      '<ul class="ui-tabs-nav ui-helper-reset ' +
        'ui-helper-clearfix ui-widget-header ui-corner-all">' +
      '<li class="ui-state-default ui-corner-top inv-tabs-qw">' +
      '<label for="qwtab1">Quick Wear / Use / Extract<br>Manager</label>' +
      '</li>' +
      '<li class="ui-state-default ui-corner-top inv-tabs-ah">' +
      '<label for="qwtab2">Inventory Manager Counter' +
        '<br>filtered by AH Quick Search</label>' +
      '</li><div id="setPrompt" class="fshFloatRight fshCenter"></div></ul>'
  });
}

function showQuickWear(appInv) {
  itemList = appInv;
  var invTabs = createInvTabs();
  var invTabsQw = createQuickWear(appInv);
  invTabs.appendChild(invTabsQw);
  content.innerHTML = '';
  content.appendChild(invTabs);
  invTabs.addEventListener('click', listen);
  invTabs.appendChild(showAHInvManager(appInv));
  document.getElementById('setPrompt').insertAdjacentHTML('beforeend',
    simpleCheckboxHtml('disableQuickWearPrompts'));
}

export default function insertQuickWear(injector) {
  content = injector || layout.pCC;
  if (!content) {return;}
  content.insertAdjacentHTML('beforeend', 'Getting item list from backpack...');
  loadInventory().done(showQuickWear);
  disableQuickWearPrompts = system.getValue('disableQuickWearPrompts');
}
