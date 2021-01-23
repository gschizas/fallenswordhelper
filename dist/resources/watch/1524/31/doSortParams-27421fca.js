import { c as calf, aM as isUndefined } from './calfSystem-91adbec8.js';

function reverseSort(headerClicked) {
  return calf.sortBy && calf.sortBy === headerClicked;
}

function doSortParams(target) {
  const headerClicked = target.getAttribute('sortKey');
  if (isUndefined(calf.sortAsc)) { calf.sortAsc = true; }
  if (reverseSort(headerClicked)) {
    calf.sortAsc = !calf.sortAsc;
  }
  calf.sortBy = headerClicked;
}

export { doSortParams as d };
//# sourceMappingURL=doSortParams-27421fca.js.map
