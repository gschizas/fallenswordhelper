import {options} from '../options';
import saveOptions from '../saveOptions';

export default function changeLvls(fshInv) { // jQuery
  var minLvl = parseInt($('#fshMinLvl').val(), 10);
  var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
  if (isNaN(minLvl) || isNaN(maxLvl)) {return;}
  options.fshMinLvl = minLvl;
  options.fshMaxLvl = maxLvl;
  saveOptions(options);
  $(fshInv).DataTable().draw(false);
}
