import lastActivityMins from './lastActivityMins';
import partial from './partial';

var getDot = [
  [2, 'greenDiamond'],
  [5, 'yellowDiamond'],
  [30, 'orangeDiamond'],
  [10080, 'offlineDot'],
  [44640, 'sevenDayDot']
];

function activity(min, el) {return min < el[0];}

function aDot(type) {
  var tip = 'Offline';
  if (type === 'greenDiamond') {tip = 'Online';}
  return '<span class="fshDot ' + type +
    ' tip-static" data-tipped="' + tip + '"></span>';
}

export default function onlineDot(obj) {
  var min = lastActivityMins(obj);
  var which = getDot.find(partial(activity, min));
  if (which) {return aDot(which[1]);}
  return aDot('redDot');
}
