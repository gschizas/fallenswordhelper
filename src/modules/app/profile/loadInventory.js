import callApp from '../callApp';

export default function loadInventory() {
  return callApp({cmd: 'profile', subcmd: 'loadinventory', app: '1'});
}
