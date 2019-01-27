import getText from '../../common/getText';

function rewardType(theCells) {
  return theCells[2].firstChild.firstChild.firstChild.firstChild
    .nextSibling.firstChild.title;
}

export default function basicBounty(theCells) {
  var targetData = theCells[0].firstChild.firstChild;
  return {
    target: getText(targetData.firstChild),
    link: targetData.href,
    lvl: getText(targetData.nextSibling).replace(/[[|\]]/, ''),
    reward: getText(theCells[2]),
    rewardType: rewardType(theCells),
    posted: getText(theCells[3]),
    xpLoss: getText(theCells[4]),
  };
}
