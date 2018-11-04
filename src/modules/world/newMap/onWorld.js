import calf from '../../support/calf';
import {colorHash} from './assets';
import {getElementById} from '../../common/getElement';
import on from '../../common/on';
import {titanStats} from './titanStats/titanStats';
import {
  def_playerBuffs,
  def_suffixSuccessActionResponse
} from '../../support/constants';
import {injectButtons, levelStats} from './buttons';
import {injectSendGoldOnWorld, updateSendGoldOnWorld} from './sendGold';

function fixDebuffQTip(e) { // jQuery.min
  $(e.target).qtip('hide');
}

function hazRealm(data) {
  return data.realm && data.realm.name;
}

function injectWorldNewMap(data) {
  updateSendGoldOnWorld(data);
  if (hazRealm(data)) {
    injectButtons(data);
    titanStats(data);
    on(getElementById('buffList'), 'click', fixDebuffQTip);
    if (calf.hideSubLvlCreature) {GameData.fetch(256);}
  }
}

function impIconColour() { // jQuery
  var imp = $('#actionlist-shield-imp');
  if (imp.length === 1) {
    imp.css('background-color',
      colorHash[imp.text()] || '#ad8043');
  }
}

export default function onWorld() {
  injectSendGoldOnWorld();
  if (window.initialGameData) {// HCS initial data
    injectWorldNewMap(window.initialGameData);
    impIconColour(null,
      {b: window.initialGameData.player.buffs});
  }
  $.subscribe('-1' + def_suffixSuccessActionResponse +
              ' 5' + def_suffixSuccessActionResponse,
  function(e, data) { // change of information
    injectWorldNewMap(data);
  });
  $.subscribe(def_playerBuffs, impIconColour);
  $.subscribe('level.stats-player', levelStats);
}
