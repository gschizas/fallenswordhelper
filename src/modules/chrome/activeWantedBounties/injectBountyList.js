import { bountyList } from './lists';
import { bountyListDiv } from './createDivs';
import { bountyUrl } from '../../support/constants';
import createDiv from '../../common/cElement/createDiv';
import createSpan from '../../common/cElement/createSpan';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import setInnerHtml from '../../dom/setInnerHtml';
import setValueJSON from '../../system/setValueJSON';

export let bountyListReset;

function makeMouseOver(el) {
  return `Level:  ${el.lvl
  }<br>Reward: ${el.reward} ${el.rewardType
  }<br>XP Loss Remaining: ${el.xpLoss
  }<br>Progress:  ${el.progress}`;
}

export function injectBountyList() { // Legacy
  setValueJSON('bountyList', bountyList);
  setInnerHtml('', bountyListDiv);
  const heading = createDiv(
    { innerHTML: `<a href="${bountyUrl}">Active Bounties</a> ` },
  );
  bountyListReset = createSpan({ className: 'xxsLink', textContent: 'Reset' });
  insertElement(heading, bountyListReset);
  insertElement(bountyListDiv, heading);
  let output = '';
  if (bountyList.bounty.length === 0) {
    output += '<div class="xsOrange">[No active bounties]</div>';
  } else {
    for (let i = 0; i < bountyList.bounty.length; i += 1) {
      output += `<a href="${bountyList.bounty[i].link
      }" class="tip-static" data-tipped="${
        makeMouseOver(bountyList.bounty[i])}">${
        bountyList.bounty[i].target}</a><br>`;
    }
  }
  insertHtmlBeforeEnd(bountyListDiv, output);
}
