import {nowSecs} from '../support/now';
import partial from './partial';

var getMins = [
  function(obj, min) {
    if (obj.day) {return min + parseInt(obj.day, 10) * 1440;}
    return min;
  },
  function(obj, min) {
    if (obj.hour) {return min + parseInt(obj.hour, 10) * 60;}
    return min;
  },
  function(obj, min) {
    if (obj.min) {return min + parseInt(obj.min, 10);}
    return min;
  },
  function(obj, min) {
    if (obj.last_login) {
      return Math.floor((nowSecs - obj.last_login) / 60);
    }
    return min;
  },
  function(obj, min) {
    // last_login is 'false' over 30 days
    if ('last_login' in obj && !obj.last_login) {return 99999;}
    return min;
  }
];

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

function sum(obj, prev, curr) {return curr(obj, prev);}

export default function onlineDot(obj) {
  var min = getMins.reduce(partial(sum, obj), 0);
  var which = getDot.find(partial(activity, min));
  if (which) {return aDot(which[1]);}
  return aDot('redDot');
}
