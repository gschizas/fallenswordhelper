function getIntVal(selector) {
  return parseInt($(selector).val(), 10);
}

export default function changeMinMax(newOpts, redraw) {
  const minLvl = getIntVal('#fshMinLvl');
  const maxLvl = getIntVal('#fshMaxLvl');
  if (isNaN(minLvl) || isNaN(maxLvl)) { return; }
  newOpts(minLvl, maxLvl);
  redraw();
}
