import {nowSecs} from '../support/constants';

var redDot =
  '<span class="fshDot redDot tip-static" data-tipped="Offline"></span>';
var greenDiamond =
  '<span class="fshDot greenDiamond tip-static" data-tipped="Online"></span>';
var yellowDiamond =
  '<span class="fshDot yellowDiamond tip-static" data-tipped="Offline"></span>';
var orangeDiamond =
  '<span class="fshDot orangeDiamond tip-static" data-tipped="Offline"></span>';
var offlineDot =
  '<span class="fshDot offlineDot tip-static" data-tipped="Offline"></span>';
var sevenDayDot =
  '<span class="fshDot sevenDayDot tip-static" data-tipped="Offline"></span>';

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
  {condition: 2, result: greenDiamond},
  {condition: 5, result: yellowDiamond},
  {condition: 30, result: orangeDiamond},
  {condition: 10080, result: offlineDot},
  {condition: 44640, result: sevenDayDot}
];

export default function onlineDot(obj) {
  var min = getMins.reduce(function(prev, curr) {
    return curr(obj, prev);
  }, 0);
  for (var i = 0; i < getDot.length; i += 1) {
    var el = getDot[i];
    if (min < el.condition) {return el.result;}
  }
  return redDot;
}
