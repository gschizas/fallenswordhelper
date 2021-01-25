import { n as numberIsNaN } from './numberIsNaN-fecd7e6d.js';

function getIntVal(selector) {
  return parseInt($(selector).val(), 10);
}

function changeMinMax(newOpts, redraw) {
  const minLvl = getIntVal('#fshMinLvl');
  const maxLvl = getIntVal('#fshMaxLvl');
  if (numberIsNaN(minLvl) || numberIsNaN(maxLvl)) { return; }
  newOpts(minLvl, maxLvl);
  redraw();
}

export { changeMinMax as c };
//# sourceMappingURL=changeMinMax-b9ad340a.js.map
