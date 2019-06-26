import allthen from '../common/allthen';
import indexAjaxData from '../ajax/indexAjaxData';
import infoBoxFrom from '../common/InfoBoxFrom';
import partial from '../common/partial';

function ajaxResult(componentId, html) {
  var info = infoBoxFrom(html);
  var _r = 1;
  if (info === 'Component destroyed.') {_r = 0;}
  return {r: _r, m: info, c: componentId};
}

function destroyComponent(componentId) {
  return indexAjaxData({
    cmd: 'profile',
    subcmd: 'destroycomponent',
    component_id: componentId
  }).then(partial(ajaxResult, componentId));
}

function formatResults(resultAry) {
  const good = resultAry.filter(e => e.r === 0);
  const bad = resultAry.filter(e => e.r === 1);
  if (good.length > 0) {
    return {r: good.map(e => e.c), s: true};
  }
  if (bad.length > 0) {
    return {e: {message: bad[0].m}, s: false};
  }
  return {e: {message: resultAry[0].m}, s: false};
}

export default function dropComponent(componentIdAry) {
  return allthen(componentIdAry.map(destroyComponent), formatResults);
}
