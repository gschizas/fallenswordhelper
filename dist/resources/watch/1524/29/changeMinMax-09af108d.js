import { n as numberIsNaN } from './numberIsNaN-d1ebf732.js';

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
//# sourceMappingURL=changeMinMax-09af108d.js.map
