import changeMinMax from '../../../common/changeMinMax';
import {options} from '../options';
import partial from '../../../common/partial';
import saveOptions from '../saveOptions';

function newOpts(newMin, newMax) {
  options.fshMinLvl = newMin;
  options.fshMaxLvl = newMax;
  saveOptions(options);
}

function redrawTable(fshInv) {
  $(fshInv).DataTable().draw(false);
}

export default function changeLvls(fshInv) { // jQuery
  changeMinMax(newOpts, partial(redrawTable, fshInv));
}
