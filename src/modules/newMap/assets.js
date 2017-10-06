import * as system from '../support/system';

export default {
  colorHash: {
    '0': 'red', // Should never see this.
    '1': 'orange',
    '2': 'yellow'
  },
  worldFormgroup:
    '<a href="#" class="fshCurveBtn tip-static" ' +
      'data-tipped="Quick Create Attack Group" ' +
      'style="background-image: url(\'' + system.imageServer +
      '/skin/realm/icon_action_formgroup.gif\');">' +
    '</a>',
  worldQuickBuff:
    '<a href="#" class="fshCurveBtn tip-static" ' +
      'data-tipped="Open Quick Buff Popup" ' +
      'style="background-image: url(\'' + system.imageServer +
      '/skin/realm/icon_action_quickbuff.gif\');">' +
    '</a>',
  worldMap:
    '<a href="index.php?cmd=world&subcmd=map" target="fsWorldMap" ' +
      'class="fshCurveBtn tip-static" data-tipped="Open Realm Map" ' +
      'style="background-image: url(\'' + system.imageServer +
      '/skin/realm/icon_action_map.gif\');">' +
    '</a>',
  searchMapUFSG:
    '<a href="https://guide.fallensword.com/index.php?cmd=realms' +
      '&subcmd=view&realm_id=@@realmId@@" target="mapUFSG" ' +
      'class="fshCurveBtn tip-static" data-tipped="Search map in ' +
      'Ultimate FSG" style="background-image: url(\'' +
      system.imageServer + '/temple/1.gif\');">' +
    '</a>',
  bias: {
    '0': {generalVariable: 1.1053, hpVariable: 1.1},
    '1': {generalVariable: 1.1, hpVariable: 1.053},
    '2': {generalVariable: 1.053, hpVariable: 1},
    '3': {generalVariable: 1.1053, hpVariable: 1}
  },
  huntingOnImage: '<a href="#" id="HelperToggleHuntingMode" ' +
    'class="huntOn fshCurveBtn tip-static" ' +
    'data-tipped="Hunting mode is ON"></a>',
  huntingOffImage: '<a href="#" id="HelperToggleHuntingMode" ' +
    'class="huntOff fshCurveBtn tip-static" ' +
    'data-tipped="Hunting mode is OFF"></a>',
  soundMuteImage: '<a href="#" id="toggleSoundLink" ' +
    'class="soundOn fshCurveBtn tip-static" ' +
    'data-tipped="Turn Off Sound when you have a new log message"></a>',
  soundImage: '<a href="#" id="toggleSoundLink" ' +
    'class="soundOff fshCurveBtn tip-static" ' +
    'data-tipped="Turn On Sound when you have a new log message"></a>'
};
