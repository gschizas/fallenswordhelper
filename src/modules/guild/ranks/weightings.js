import bitwiseAnd from '../../common/bitwiseAnd';
import {daRanksView} from '../../_dataAccess/_dataAccess';
import getText from '../../common/getText';
import insertElement from '../../common/insertElement';
import insertHtmlAfterBegin from '../../common/insertHtmlAfterBegin';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import on from '../../common/on';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import replaceChild from '../../common/replaceChild';
import roundToString from '../../common/roundToString';
import {createInput, createSpan} from '../../common/cElement';

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

function calcPermWeight(perms) {
  return roundToString(
    privLookup.filter(([flag]) => bitwiseAnd(perms, flag))
      .reduce((a, [, weight]) => a + weight - 1, 0) +
    perms.toString(2).split('').map(Number).reduce((a, b) => a + b, 0)
    , 1
  );
}

function parseRankData(memberRanks, row) {
  // Makes a weighted calculation of available permissions and gets tax rate
  var rankCell = row.children[0];
  var rankName = getText(rankCell.firstChild); // Text Node
  var thisRank = memberRanks.find(r => r.name === rankName);
  if (thisRank) {
    insertHtmlAfterBegin(rankCell, '<span class="fshBlue">(' +
      calcPermWeight(thisRank.permissions) +
      ') Tax:(' + thisRank.tax + '%)</span> ');
  }
}

function gotRankData(theRows, spinner, json) {
  if (json.s) {
    theRows.forEach(partial(parseRankData, [json.r['0']].concat(json.r.ranks)));
    spinner.classList.remove('fshSpinner');
  }
}

function fetchRankData(theRows, weightButton) {
  const spinner =
    createSpan({
      className: 'fshBlock fshRelative fshSpinner fshSpinner12',
      style: {height: '15px', width: '136px'}
    });
  replaceChild(spinner, weightButton);
  daRanksView().then(partial(gotRankData, theRows, spinner));
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
