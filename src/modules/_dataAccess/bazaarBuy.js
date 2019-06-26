import indexAjaxData from '../ajax/indexAjaxData';
import infoBoxFrom from '../common/InfoBoxFrom';

function formatResults(html) {
  const info = infoBoxFrom(html);
  if (info === 'You purchased the item!') {return {s: true};}
  return {e: {message: info}, s: false};
}

export default function bazaarBuy(item) {
  return indexAjaxData({
    cmd: 'potionbazaar',
    subcmd: 'buyitem',
    item_id: item
  }).then(formatResults);
}
