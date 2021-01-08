import closestTr from '../../common/closestTr';

export default function removeRow(c) {
  const tr = closestTr(c);
  tr.nextElementSibling.remove();
  tr.remove();
}
