import assets from './assets';
import calf from '../support/calf';
import {getElementById} from '../common/getElement';
import {
  def_playerBuffs,
  def_suffixSuccessActionResponse
} from '../support/dataObj';
import {injectButtons, levelStats} from './buttons';
import {injectSendGoldOnWorld, updateSendGoldOnWorld} from './sendGold';

function fixDebuffQTip(e) { // jQuery.min
  $(e.target).qtip('hide');
}

function injectWorldNewMap(data) {
  updateSendGoldOnWorld(data);
  if (data.realm && data.realm.name) {
    injectButtons(data);
    getElementById('buffList')
      .addEventListener('click', fixDebuffQTip);
    if (calf.hideSubLvlCreature) {GameData.fetch(256);}
  }
}

function impIconColour() { // jQuery
  var imp = $('#actionlist-shield-imp');
  if (imp.length === 1) {
    imp.css('background-color',
      assets.colorHash[imp.text()] || '#ad8043');
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
