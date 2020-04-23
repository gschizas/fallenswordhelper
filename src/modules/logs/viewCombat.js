function getPvpId(aRow) {
  return aRow.cells[2] && /pvp_id=(\d+)/.exec(aRow.cells[2].innerHTML);
}

// function processResults(json) {
//   console.log(json);
// }

// eslint-disable-next-line
function havePvpId(aRow, pvpId) {
  // results(pvpId).then(processResults);
  // console.log(aRow, pvpId);
}

// TODO Pref
export default function viewCombat(aRow) {
  const pvpId = getPvpId(aRow);
  if (pvpId) { havePvpId(aRow, pvpId[1]); }
}
