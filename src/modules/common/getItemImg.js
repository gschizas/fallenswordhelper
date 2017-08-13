export default function getItemImg(pCC) {
  var allTables = pCC.getElementsByTagName('table');
  var lastTable = allTables[allTables.length - 1];
  return lastTable.getElementsByTagName('img');
}
