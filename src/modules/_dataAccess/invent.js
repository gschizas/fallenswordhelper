import indexAjaxData from '../ajax/indexAjaxData';
import infoBoxFrom from '../common/InfoBoxFrom';

function formatResult(html) {
  var info = infoBoxFrom(html);
  if (info.includes('successfully')) {
    return {r: {item: {}}, s: true};
  }
  return {e: {message: info}, s: false};
}

export default function invent(recipe) {
  return indexAjaxData({
    cmd: 'inventing',
    subcmd: 'doinvent',
    recipe_id: recipe
  }).then(formatResult);
}
