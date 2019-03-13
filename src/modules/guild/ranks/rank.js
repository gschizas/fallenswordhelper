import batch from '../../common/batch';
import getMembrList from '../../ajax/getMembrList';
import getText from '../../common/getText';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import notLastUpdate from '../../common/notLastUpdate';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import weightings from './weightings';
import {doButtons, setCharacterRow} from './doButtons';

function findTheRows() {
  var outerTable = pCC.lastElementChild.previousElementSibling;
  if (outerTable.rows && outerTable.rows.length > 7) {
    return Array.from(outerTable.rows[7].children[0].children[0].rows);
  }
}

function aRank(rank_name, memberRanks) {return memberRanks[0] === rank_name;}

function hasMembers(thisRank) {return thisRank && thisRank[1].length > 0;}

function getRankName(row, rankCell) {
  if (row.rowIndex === 1) {return 'Guild Founder';}
  return getText(rankCell);
}

function writeRanks(memberRanks, row) {
  var rankCell = row.children[0];
  var rankName = getRankName(row, rankCell);
  var thisRank = memberRanks.find(partial(aRank, rankName));
  if (hasMembers(thisRank)) {
    setCharacterRow(row, thisRank);
    insertHtmlBeforeEnd(rankCell, ' <span class="fshBlue">- ' +
      thisRank[1].join(', ') + '</span>');
  }
}

function gotMembers(memberRanks) {
  var theRows = findTheRows();
  if (theRows) {
    batch(3, theRows, 1, partial(writeRanks, memberRanks));
    weightings(theRows);
    doButtons();
  }
}

function rankArray(prev, ary) {
  var thisRank = prev.find(partial(aRank, ary[1].rank_name));
  if (thisRank) {
    thisRank[1].push(ary[0]);
  } else {
    prev.push([ary[1].rank_name, [ary[0]]]);
  }
  return prev;
}

function makeRanks(json) {
  return Object.entries(json).filter(notLastUpdate).reduce(rankArray, []);
}

export default function injectGuildRanks() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  getMembrList(false).then(makeRanks).then(gotMembers);
}
