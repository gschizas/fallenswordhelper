import notWorld from './notWorld';

export default function doRepair() {
  // do not use repair link for new map
  notWorld('doRepair', 'index.php?cmd=blacksmith&subcmd=repairall');
}
