import {defaultOptions} from '../assets';
import {options} from '../options';
import setForage from '../../ajax/setForage';

export default function resetLvls() { // jQuery
  options.fshMinLvl = defaultOptions.fshMinLvl;
  options.fshMaxLvl = defaultOptions.fshMaxLvl;
  setForage('fsh_inventory', options);
  $('#fshMinLvl').val(options.fshMinLvl);
  $('#fshMaxLvl').val(options.fshMaxLvl);
  $('#fshInv').DataTable().draw(false);
}
