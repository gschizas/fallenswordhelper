import {bountyListDiv} from './activeWantedBounties';
import calf from '../support/calf';
import insertElement from '../common/insertElement';
import setValueJSON from '../system/setValueJSON';
import {bountyList, retrieveBountyInfo} from './retrieveBountyInfo';
import {createDiv, createSpan} from '../common/cElement';

function resetBountyList() {
  setValueJSON('bountyList', null);
  retrieveBountyInfo(calf.enableActiveBountyList, calf.enableWantedList);
}

function makeMouseOver(el) {
  return 'Level:  ' + el.lvl +
    '<br>Reward: ' + el.reward + ' ' + el.rewardType +
    '<br>XP Loss Remaining: ' + el.xpLoss +
    '<br>Progress:  ' + el.progress;
}

export default function injectBountyList() { // Legacy
  setValueJSON('bountyList', bountyList);

  bountyListDiv.innerHTML = '';

  var heading = createDiv({textContent: 'Active Bounties '});
  var reset = createSpan({className: 'xxsLink', textContent: 'Reset'});
  reset.addEventListener('click', resetBountyList);
  insertElement(heading, reset);
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
  bountyListDiv.insertAdjacentHTML('beforeend', output);
}
