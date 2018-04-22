import profile from './profile';

export default function loadInventory() {
  return profile({subcmd: 'loadinventory'});
}
