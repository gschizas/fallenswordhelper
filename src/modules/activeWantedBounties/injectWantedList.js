import calf from '../support/calf';
import insertElement from '../common/insertElement';
import {setValueJSON} from '../system/system';
import {wantedListDiv} from './activeWantedBounties';
import {createDiv, createSpan} from '../common/cElement';
import {retrieveBountyInfo, wantedList} from './retrieveBountyInfo';

function resetWantedList() {
  setValueJSON('wantedList', null);
  retrieveBountyInfo(calf.enableActiveBountyList, calf.enableWantedList);
}

function makeMouseOver(el) {
  return 'Target Level:  ' + el.lvl +
    '<br>Offerer: ' + el.offerer +
    '<br>Reward: ' + el.reward + ' ' + el.rewardType +
    '<br>XP Loss Remaining: ' + el.xpLoss +
    '<br>Posted: ' + el.posted +
    '<br>Tickets Req.:  ' + el.tickets;
}

function acceptBtn(bounty) {
  if (bounty.accept) {
    return '<span class="xsGreen" onclick="' + bounty.accept +
      '">[a]</span>&nbsp;';
  }
  return '';
}

export default function injectWantedList() { // Legacy
  setValueJSON('wantedList', wantedList);

  wantedListDiv.innerHTML = '';

  var heading = createDiv({textContent: 'Wanted Bounties '});
  var reset = createSpan({className: 'xxsLink', textContent: 'Reset'});
  reset.addEventListener('click', resetWantedList);
  insertElement(heading, reset);
  insertElement(wantedListDiv, heading);

  var output = '';
  if (wantedList.bounty.length === 0) {
    output += '<div class="xsOrange">[No wanted bounties]</div>';
  } else {
    for (var i = 0; i < wantedList.bounty.length; i += 1) {
      output += acceptBtn(wantedList.bounty[i]) +
        '<a class="xsKhaki tip-static" data-tipped="' +
        makeMouseOver(wantedList.bounty[i]) +
        '" href="' + wantedList.bounty[i].link + '">' +
        wantedList.bounty[i].target + '</a><br>';
    }
  }
  wantedListDiv.insertAdjacentHTML('beforeend', output);
}
