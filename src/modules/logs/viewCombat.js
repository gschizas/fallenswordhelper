// import results from '../---/arena/results';

function getPvpId(aRow) {
  return aRow.cells[2] && /pvp_id=(\d+)/.exec(aRow.cells[2].innerHTML);
}

// function processResults(json) {
//   console.log(json);
// }

function havePvpId(aRow, pvpId) { // eslint-disable-line
  // results(pvpId).then(processResults);
  // console.log(aRow, pvpId); // eslint-disable-line no-console
}

// TODO Pref
export default function viewCombat(aRow) {
  const pvpId = getPvpId(aRow);
  if (pvpId) {havePvpId(aRow, pvpId[1]);}
}
