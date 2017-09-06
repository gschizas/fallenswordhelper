import assets from './assets';
import calf from '../support/calf';
import * as layout from '../support/layout';
import * as system from '../support/system';

function doFormGroup(e) { // jQuery
  e.preventDefault();
  $(e.target).qtip('hide');
  GameData.doAction(12, 401, {}, 0);
}

function openQuickBuff(e) {
  e.preventDefault();
  layout.openQuickBuffByName(layout.playerName());
}

function showQuickLinks(worldName, data) { // jQuery
  worldName.append('<div class="fshFsty"><div>Min Lvl: ' + data.realm.minlevel +
    '</div><div>Your Lvl: ' + data.player.level + '</div></div>');
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
  var img = assets.soundImage;
  if (system.getValue('playNewMessageSound')) {img = assets.soundMuteImage;}
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
  var img = assets.huntingOffImage;
  if (calf.huntingMode) {img = assets.huntingOnImage;}
  worldName.append('&nbsp;').append(img);
  worldName.on('click', '#HelperToggleHuntingMode',
    toggleHuntMode);
}

export default function injectButtons(data) { // jQuery
  var worldName = $('#worldName');
  // worldName.html(data.realm.name); // BUGFIX - incase of switchign between master realm and realm they dont replace teh realm name
  GameController.Realm.footprintTileList = []; // BUGFIX - in case of teleporting in new realm with footprints turned on
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
