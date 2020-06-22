import { n as numberIsNaN } from './numberIsNaN-4e564176.js';

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
//# sourceMappingURL=changeMinMax-c2e02463.js.map
