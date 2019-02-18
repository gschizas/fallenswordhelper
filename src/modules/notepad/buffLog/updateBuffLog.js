import buffList from '../../support/buffObj.json';
import formatLocalDateTime from '../../common/formatLocalDateTime';
import {fshBuffLog} from '../../support/constants';
import getForage from '../../ajax/getForage';
import getValue from '../../system/getValue';
import partial from '../../common/partial';
import querySelectorArray from '../../common/querySelectorArray';
import setForage from '../../ajax/setForage';

function buff(thisBuff, el) {return el.name === thisBuff;}

function getStamUsed(buffCast) {
  var thisBuff = buffList.find(partial(buff, buffCast[1]));
  if (thisBuff) {return thisBuff.stam.toString();}
  return '-';
}

function successfull(timeStamp, buffCast) {
  return timeStamp + ' ' + buffCast[0] + ' (' + getStamUsed(buffCast) +
    ' stamina)<br>';
}

function rejected(timeStamp, buffsNotCast) {
  return timeStamp + ' <span class="fshRed">' + buffsNotCast[0] + '</span><br>';
}

var transform;

function buildTransform() {
  return [
    [new RegExp('Skill ([\\w ]*) level (\\d*) was activated on \'(\\w*)\''),
      successfull],
    [new RegExp('The skill ([\\w ]*) of current or higher level is currently ' +
      'active on \'(\\w*)\''), rejected],
    [new RegExp('Player \'(\\w*)\' has set their preferences to block the ' +
      'skill \'([\\w ]*)\' from being cast on them.'), rejected]
  ];
}

function doRegExp(el, pair) {
  return [
    pair[0].exec(el.innerText),
    pair[1]
  ];
}

function match(pair) {return pair[0] !== null;}

function logFormat(timeStamp, el) {
  var transformed = transform.map(partial(doRegExp, el)).find(match);
  return transformed[1](timeStamp, transformed[0]);
}

function buffResult(buffLog) {
  var timeStamp = formatLocalDateTime(new Date());
  var buffsAttempted = querySelectorArray('#quickbuff-report p:not(.back)')
    .map(partial(logFormat, timeStamp));
  setForage(fshBuffLog, buffsAttempted.reverse().join('') + buffLog);
}

export default function updateBuffLog() {
  if (!getValue('keepBuffLog')) {return;}
  getForage(fshBuffLog).done(buffResult);
  transform = buildTransform();
}
