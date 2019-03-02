import getText from '../../common/getText';
import querySelector from '../../common/querySelector';

function rewardType(theCells) {
  return querySelector('img', theCells[2]).title;
}

export default function basicBounty(theCells) {
  var targetData = theCells[0].children[0].children[0];
  return {
    target: getText(targetData),
    link: targetData.href,
    lvl: getText(targetData.nextSibling).replace(/[[|\]]/, ''), // Text Node
    reward: getText(theCells[2]),
    rewardType: rewardType(theCells),
    posted: getText(theCells[3]),
    xpLoss: getText(theCells[4]),
  };
}
