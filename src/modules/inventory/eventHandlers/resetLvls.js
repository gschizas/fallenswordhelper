import {defaultOptions} from '../assets';
import {options} from '../options';
import saveOptions from '../saveOptions';

export default function resetLvls() { // jQuery
  options.fshMinLvl = defaultOptions.fshMinLvl;
  options.fshMaxLvl = defaultOptions.fshMaxLvl;
  saveOptions(options);
  $('#fshMinLvl').val(options.fshMinLvl);
  $('#fshMaxLvl').val(options.fshMaxLvl);
  $('#fshInv').DataTable().draw(false);
}
