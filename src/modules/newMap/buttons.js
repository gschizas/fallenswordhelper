import calf from '../support/calf';
import * as system from '../support/system';
import assets from './assets';

function doFormGroup(e) { // jQuery
  e.preventDefault();
  $(e.target).qtip('hide');
  GameData.doAction(12, 385, {}, 0);
}

function openQuickBuff(e) { // Native
  e.preventDefault();
  window.openWindow('index.php?cmd=quickbuff&t=' +
    document.getElementById('statbar-character').textContent,
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

function showQuickLinks(worldName, data) { // jQuery
  worldName.append('Min Lvl: ' + data.realm.minlevel);
  var formgroup = $(assets.worldFormgroup);
  worldName.append('&nbsp;&nbsp;').append(formgroup);
  formgroup.click(doFormGroup);
  var quickbuff = $(assets.worldQuickBuff);
  worldName.append('&nbsp;').append(quickbuff);
  quickbuff.click(openQuickBuff);
  worldName.append('&nbsp;').append(assets.worldMap);
}

function showSearchButtons(worldName, data) { // jQuery
  worldName.append('&nbsp;')
    .append(assets.searchMapUFSG.replace('@@realmId@@', data.realm.id));
}

function toggleSound(e) { // jQuery
  e.preventDefault();
  if (system.getValue('playNewMessageSound') === false) {
    $('#toggleSoundLink').qtip('hide')
      .replaceWith(assets.soundMuteImage);
  } else {
    $('#toggleSoundLink').qtip('hide')
      .replaceWith(assets.soundImage);
  }
  system.setValue('playNewMessageSound',
    !system.getValue('playNewMessageSound'));
}

function showSpeakerOnWorld(worldName) { // jQuery
  var img = system.getValue('playNewMessageSound') === true ?
    assets.soundMuteImage :
    assets.soundImage;
  worldName.append('&nbsp;').append(img);
  worldName.on('click', '#toggleSoundLink', toggleSound);
}

function toggleHuntMode(e) { // jQuery
  e.preventDefault();
  if (!calf.huntingMode) {
    $('#HelperToggleHuntingMode').qtip('hide')
      .replaceWith(assets.huntingOnImage);
  } else {
    $('#HelperToggleHuntingMode').qtip('hide')
      .replaceWith(assets.huntingOffImage);
  }
  calf.huntingMode = !calf.huntingMode;
  system.setValue('huntingMode', calf.huntingMode);
}

function showHuntMode(worldName) { // jQuery
  var img = calf.huntingMode === true ? assets.huntingOnImage :
    assets.huntingOffImage;
  worldName.append('&nbsp;').append(img);
  worldName.on('click', '#HelperToggleHuntingMode',
    toggleHuntMode);
}

export function injectButtons(data) { // jQuery
  var worldName = $('#worldName');
  worldName.html(data.realm.name); //HACK - incase of switchign between master realm and realm they dont replace teh realm name
  var oldButtonContainer = $('#fshWorldButtonContainer');
  if (oldButtonContainer.length !== 0) {oldButtonContainer.remove();}
  var buttonContainer = $('<div/>', {id: 'fshWorldButtonContainer'});
  showQuickLinks(buttonContainer, data);
  showSearchButtons(buttonContainer, data);
  if (system.getValue('showSpeakerOnWorld')) {
    showSpeakerOnWorld(buttonContainer);
  }
  showHuntMode(buttonContainer);
  worldName.after(buttonContainer);
}
