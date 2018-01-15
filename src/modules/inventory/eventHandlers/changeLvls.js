import {options} from '../inventory';
import setForage from '../../ajax/setForage';

export default function changeLvls() { // jQuery
  var minLvl = parseInt($('#fshMinLvl').val(), 10);
  var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
  if (isNaN(minLvl) || isNaN(maxLvl)) {return;}
  options.fshMinLvl = minLvl;
  options.fshMaxLvl = maxLvl;
  setForage('fsh_inventory', options);
  $('#fshInv').DataTable().draw(false);
}
