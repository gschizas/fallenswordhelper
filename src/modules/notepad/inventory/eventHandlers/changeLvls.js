import {options} from '../options';
import saveOptions from '../saveOptions';

function newOpts(newMin, newMax) {
  options.fshMinLvl = newMin;
  options.fshMaxLvl = newMax;
  saveOptions(options);
}

export default function changeLvls(fshInv) { // jQuery
  var minLvl = parseInt($('#fshMinLvl').val(), 10);
  var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
  if (isNaN(minLvl) || isNaN(maxLvl)) {return;}
  newOpts(minLvl, maxLvl);
  $(fshInv).DataTable().draw(false);
}
