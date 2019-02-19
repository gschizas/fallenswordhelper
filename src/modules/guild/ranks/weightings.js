import bitwiseAnd from '../../common/bitwiseAnd';
import {createInput} from '../../common/cElement';
import getText from '../../common/getText';
import hideElement from '../../common/hideElement';
import insertElement from '../../common/insertElement';
import insertHtmlAfterBegin from '../../common/insertHtmlAfterBegin';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import on from '../../common/on';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import ranks from '../../app/guild/ranks/ranks';
import roundToString from '../../common/roundToString';

var privLookup = [
  [0x2, 5], //       Bank Withdraw
  [0x4, 4], //       Build/Upgrade Structures
  [0x40, 5], //      Build/Upgrade/Demolish Structures
  [0x100, 0.1], //   Store Items
  [0x200, 0.2], //   Take Items
  [0x1000, 0.5], //  Can Mass Messages
  [0x8000, 0.2], //  Can Recall Tagged Items
  [0x80000, 0.1], // Can View Advisor
  [0x10000, 5], //   Can Un-Tag Items
  [0x400000, 4] //   Can Kick Members
];

function rankObj(rankName, rank) {return rank.name === rankName;}

function sum(prev, curr) {return prev + curr;}

function thePriv(perms, v) {return bitwiseAnd(perms, v[0]);}

function addWeight(prev, curr) {return prev + curr[1] - 1;}

function calcPermWeight(perms) {
  return roundToString(
    privLookup.filter(partial(thePriv, perms)).reduce(addWeight, 0) +
    perms.toString(2).split('').map(Number).reduce(sum, 0), 1);
}

function parseRankData(memberRanks, row) {
  // Makes a weighted calculation of available permissions and gets tax rate
  var rankCell = row.children[0];
  var rankName = getText(rankCell.firstChild);
  var thisRank = memberRanks.find(partial(rankObj, rankName));
  if (thisRank) {
    insertHtmlAfterBegin(rankCell, '<span class="fshBlue">(' +
      calcPermWeight(thisRank.permissions) +
      ') Tax:(' + thisRank.tax + '%)</span> ');
  }
}

function gotRankData(theRows, json) {
  if (json.s) {
    theRows.forEach(partial(parseRankData, [json.r['0']].concat(json.r.ranks)));
  }
}

function fetchRankData(theRows, weightButton) { // jQuery.min
  hideElement(weightButton);
  ranks().done(partial(gotRankData, theRows));
}

function injectWeightButton(theRows, addNewRank) {
  var weightButton = createInput({
    className: 'custombutton',
    type: 'button',
    value: 'Get Rank Weightings'
  });
  on(weightButton, 'click',
    partial(fetchRankData, theRows, weightButton));
  var theTd = addNewRank.parentNode.parentNode;
  insertHtmlBeforeEnd(theTd, '&nbsp;');
  insertElement(theTd, weightButton);
}

export default function weightings(theRows) {
  // gather rank info button
  var addNewRank = querySelector('#pCC a[href*="=ranks&subcmd2=add"]');
  if (addNewRank) {
    injectWeightButton(theRows, addNewRank);
  }
}
