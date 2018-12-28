import fallback from '../../system/fallback';
import getValue from '../../system/getValue';
import intValue from '../../system/intValue';
import partial from '../../common/partial';
import setValue from '../../system/setValue';
import {lvlTest, playerLvlTest} from '../../common/lvlTests';

function getVal(el, context) {
  return parseInt($(el, context).val(), 10);
}

function saveVal(key, val) {
  if (!isNaN(val)) {setValue(key, val);}
}

function dataTableSearch(context, _settings, data) { // jQuery
  var min = getVal('#fshMinLvl', context);
  var max = getVal('#fshMaxLvl', context);
  saveVal('onlinePlayerMinLvl', min);
  saveVal('onlinePlayerMaxLvl', max);
  var level = fallback(intValue(data[2]), 0);
  return lvlTest(playerLvlTest, level, min, max);
}

export default function filterHeaderOnlinePlayers(context) { // jQuery
  $.fn.dataTable.ext.search.push(partial(dataTableSearch, context));
  $('#fshOutput', context).html(
    '<div align=right>' +
    'Min lvl:<input value="' + getValue('onlinePlayerMinLvl') +
      '" size=5 id="fshMinLvl" /> ' +
    'Max lvl:<input value="' + getValue('onlinePlayerMaxLvl') +
      '" size=5 id="fshMaxLvl" /> ' +
    '<input id="fshReset" type="button" value="Reset"/>' +
    '</div><table id="fshInv" class="allow stripe hover"></table>');
}
