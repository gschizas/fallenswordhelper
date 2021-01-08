import getInventoryById from '../../../ajax/getInventoryById';

let invPrm;

export default function getInv() {
  if (!invPrm) {
    invPrm = getInventoryById();
  }
  return invPrm;
}
