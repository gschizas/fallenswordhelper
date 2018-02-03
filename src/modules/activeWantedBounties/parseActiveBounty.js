import {bountyList} from './retrieveBountyInfo';

export default function parseActiveBounty(activeTable) { // Legacy
  if (!/No bounties active/.test(activeTable.rows[1].cells[0].innerHTML)) {
    for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
      var theCells = activeTable.rows[i].cells;
      var thisBounty = {};
      thisBounty.target = theCells[0].firstChild
        .firstChild.firstChild.textContent;
      thisBounty.link = theCells[0].firstChild.firstChild.href;
      thisBounty.lvl = theCells[0].firstChild
        .firstChild.nextSibling.textContent
        .replace(/\[/, '').replace(/\]/, '');
      thisBounty.reward = theCells[2].textContent;
      thisBounty.rewardType = theCells[2]
        .firstChild.firstChild.firstChild.firstChild
        .nextSibling.firstChild.title;
      thisBounty.posted = theCells[3].textContent;
      thisBounty.xpLoss = theCells[4].textContent;
      thisBounty.progress = theCells[5].textContent;
      bountyList.bounty.push(thisBounty);
    }
  }
}
