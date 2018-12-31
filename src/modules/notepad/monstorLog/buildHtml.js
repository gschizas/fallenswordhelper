import addCommas from '../../system/addCommas';
import extend from '../../common/extend';
import {imageServer} from '../../system/system';

function imgHtml(image_id) {
  return '<img class="tip-static" src="' + imageServer +
    '/creatures/' + image_id + '.jpg" data-tipped="<img src=\'' +
    imageServer + '/creatures/' + image_id +
    '.jpg\' width=200 height=200>" width=40 height=40>';
}

function hazEnhancements(enhancements) {
  return enhancements && Object.keys(enhancements).length > 0;
}

function statMinMax(stat) {
  return stat.min.toString() + ' - ' + stat.max.toString();
}

function buildEnhancements(pair) {
  return '<span class="fshNoWrap">' + pair[0] + ': ' +
    statMinMax(pair[1]) + '</span>';
}

function formatEnhancements(enhancements) {
  if (hazEnhancements(enhancements)) {
    var tmp = '<span class="fshXXSmall">';
    tmp += Object.entries(enhancements).map(buildEnhancements).join('<br>');
    return tmp + '</span>';
  }
  return '<span class="fshGrey">**Missing**</span>';
}

export default function buildHtml(data, key) {
  return extend(data[key], {
    name: key,
    image: imgHtml(data[key].image_id),
    level: addCommas(data[key].level),
    attack: statMinMax(data[key].attack),
    defense: statMinMax(data[key].defense),
    armor: statMinMax(data[key].armor),
    damage: statMinMax(data[key].damage),
    hp: statMinMax(data[key].hp),
    enhancements: formatEnhancements(data[key].enhancements)
  });
}
