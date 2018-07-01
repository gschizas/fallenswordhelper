import doGroupPaint from './doGroupPaint';
import getMembrList from '../ajax/getMembrList';
import getValue from '../system/getValue';
import groupButtons from './groupButtons';
import jQueryNotPresent from '../common/jQueryNotPresent';

function displayMinGroupLevel() { // jQuery
  var minGroupLevel = getValue('minGroupLevel');
  if (minGroupLevel) {
    $('#pCC > table > tbody > tr > td > table td').first()
      .append('<span style="color:blue"> ' +
      'Current Min Level Setting: ' + minGroupLevel + '</span>');
  }
}

function fixTable() { // jQuery
  // Cows don't add!
  var tds = $('#pCC td.header-dark');
  tds.eq(0).attr('width', '20%');
  tds.eq(1).attr('width', '51%');
  tds.eq(2).attr('width', '22%');
  tds.eq(3).attr('width', '7%');
}

export default function injectGroups() { // jQuery
  if (jQueryNotPresent()) {return;}
  getMembrList(false)
    .done(doGroupPaint);
  displayMinGroupLevel();
  groupButtons();
  fixTable();
}
