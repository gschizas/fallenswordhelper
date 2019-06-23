import {bountyList} from './lists';
import {bountyListDiv} from './createDivs';
import {bountyUrl} from '../../support/constants';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import setValueJSON from '../../system/setValueJSON';
import {createDiv, createSpan} from '../../common/cElement';

export var bountyListReset;

function makeMouseOver(el) {
  return 'Level:  ' + el.lvl +
    '<br>Reward: ' + el.reward + ' ' + el.rewardType +
    '<br>XP Loss Remaining: ' + el.xpLoss +
    '<br>Progress:  ' + el.progress;
}

export function injectBountyList() { // Legacy
  setValueJSON('bountyList', bountyList);
  bountyListDiv.innerHTML = '';
  var heading = createDiv(
    {innerHTML: '<a href="' + bountyUrl + '">Active Bounties</a> '});
  bountyListReset = createSpan({className: 'xxsLink', textContent: 'Reset'});
  insertElement(heading, bountyListReset);
  insertElement(bountyListDiv, heading);
  var output = '';
  if (bountyList.bounty.length === 0) {
    output += '<div class="xsOrange">[No active bounties]</div>';
  } else {
    for (var i = 0; i < bountyList.bounty.length; i += 1) {
      output += '<a href="' + bountyList.bounty[i].link +
        '" class="tip-static" data-tipped="' +
        makeMouseOver(bountyList.bounty[i]) + '">' +
        bountyList.bounty[i].target + '</a><br>';
    }
  }
  insertHtmlBeforeEnd(bountyListDiv, output);
}
