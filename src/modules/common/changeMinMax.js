function getIntVal(selector) {
  return parseInt($(selector).val(), 10);
}

export default function changeMinMax(newOpts, redraw) {
  var minLvl = getIntVal('#fshMinLvl');
  var maxLvl = getIntVal('#fshMaxLvl');
  if (isNaN(minLvl) || isNaN(maxLvl)) {return;}
  newOpts(minLvl, maxLvl);
  redraw();
}
