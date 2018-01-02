import calf from '../support/calf';

function reverseSort(headerClicked) {
  return calf.sortBy && calf.sortBy === headerClicked;
}

export default function doSortParams(headerClicked) {
  if (typeof calf.sortAsc === 'undefined') {calf.sortAsc = true;}
  if (reverseSort(headerClicked)) {
    calf.sortAsc = !calf.sortAsc;
  }
  calf.sortBy = headerClicked;
}
