import { invManFilter } from './assets';
import { pCC } from '../../support/layout';
import setInnerHtml from '../../dom/setInnerHtml';
import { theInv } from './buildInv';

export default function headers() {
  let reportTitle;
  if (theInv.player_id) {
    reportTitle = `<b>&nbsp;Inventory Manager</b> ${
      theInv.items.length
    } items (green = worn, blue = backpack)`;
  } else {
    reportTitle = `<b>&nbsp;Guild Inventory Manager</b> ${
      theInv.items.length
    } items (maroon = in BP, blue=guild store)`;
  }
  setInnerHtml(invManFilter.replace('@@reportTitle@@', reportTitle), pCC);
}
