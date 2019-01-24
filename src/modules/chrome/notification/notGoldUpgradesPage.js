export default function notGoldUpgradesPage() {
  return location.search.indexOf('cmd=points&type=1') === -1;
}
