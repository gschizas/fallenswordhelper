import { c as calf, aj as isUndefined } from './calfSystem-d357ca6f.js';

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
//# sourceMappingURL=doSortParams-b80e3bd8.js.map
