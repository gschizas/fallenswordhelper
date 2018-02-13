import {invManFilter} from './assets';
import {theInv} from './options';

export default function headers() { // jQuery
  var reportTitle;
  if (theInv.player_id) {
    reportTitle = '<b>&nbsp;Inventory Manager</b> ' +
      theInv.items.length +
      ' items (green = worn, blue = backpack)';
  } else {
    reportTitle = '<b>&nbsp;Guild Inventory Manager</b> ' +
      theInv.items.length +
      ' items (maroon = in BP, blue=guild store)';
  }
  var myHtml = invManFilter.replace('@@reportTitle@@', reportTitle);
  $('#pCC').html(myHtml);
}
