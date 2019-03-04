import {createInput} from '../common/cElement';
import findOnlinePlayers from './findOnlinePlayers';
import functionPasses from '../common/functionPasses';
import getElementsByTagName from '../common/getElementsByTagName';
import getTextTrim from '../common/getTextTrim';
import insertElementAfterBegin from '../common/insertElementAfterBegin';
import isObject from '../common/isObject';
import jQueryPresent from '../common/jQueryPresent';
import on from '../common/on';
import {pCC} from '../support/layout';

function looksLikeTopRated() {
  var theCell = getElementsByTagName('td', pCC)[0];
  theCell.children[0].className = 'fshTopListWrap';
  var findBtn = createInput({
    id: 'fshFindOnlinePlayers',
    className: 'custombutton tip-static',
    type: 'button',
    value: 'Find Online Players',
    dataset: {
      tipped: 'Fetch the online status of the ' +
        'top 250 players (warning ... takes a few seconds).'
    }
  });
  insertElementAfterBegin(theCell, findBtn);
  on(findBtn, 'click', findOnlinePlayers);
}

var topRatedTests = [
  function() {return jQueryPresent();},
  function() {return isObject(pCC);},
  function() {return isObject(pCC.children[0]);},
  function() {return isObject(pCC.children[0].rows);},
  function() {return pCC.children[0].rows.length > 2;},
  function() {
    return getTextTrim(pCC.children[0].rows[1]).startsWith('Last Updated');
  }
];

function testforTopRated() {
  return topRatedTests.every(functionPasses);
}

export default function injectTopRated() {
  if (testforTopRated()) {looksLikeTopRated();}
}
