import {arenaFilter} from './assets';
import {defaults} from '../support/dataObj';
import {changeLvls, hideMoves, opts, resetLvls} from './setOpts';

function hideMovesCheckbox(aTable) { // jQuery
  var fshHideMoves = $('#fshHideMoves', aTable);
  if (opts && 'hideMoves' in opts) {
    fshHideMoves.prop('checked', opts.hideMoves);
    $('.moveMax').toggle(!opts.hideMoves);
  }
  fshHideMoves.click(hideMoves);
}

function minLvlValue(aTable) { // jQuery
  var fshMinLvl = $('#fshMinLvl', aTable);
  if (opts && 'minLvl' in opts) {
    fshMinLvl.val(opts.minLvl);
  } else {
    fshMinLvl.val(defaults.arenaMinLvl);
  }
}

function maxLvlValue(aTable) { // jQuery
  var fshMaxLvl = $('#fshMaxLvl', aTable);
  if (opts && 'maxLvl' in opts) {
    fshMaxLvl.val(opts.maxLvl);
  } else {
    fshMaxLvl.val(defaults.arenaMaxLvl);
  }
}

export default function filterHeader() { // jQuery
  var theRow = $('#pCC > table > tbody > tr:nth-child(7)');
  theRow.clone().insertBefore(theRow).find('td').attr('height', '2');
  theRow.clone().insertAfter(theRow).find('td').attr('height', '1');
  var aTable = $(arenaFilter);
  hideMovesCheckbox(aTable);
  minLvlValue(aTable);
  maxLvlValue(aTable);
  $('#fshMinLvl, #fshMaxLvl', aTable).keyup(changeLvls);
  $('#fshReset', aTable).click(resetLvls);
  $('td', theRow).append(aTable);
}
