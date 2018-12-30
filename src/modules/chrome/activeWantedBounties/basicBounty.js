function rewardType(theCells) {
  return theCells[2].firstChild.firstChild.firstChild.firstChild
    .nextSibling.firstChild.title;
}

export default function basicBounty(theCells) {
  var targetData = theCells[0].firstChild.firstChild;
  return {
    target: targetData.firstChild.textContent,
    link: targetData.href,
    lvl: targetData.nextSibling.textContent.replace(/[[|\]]/, ''),
    reward: theCells[2].textContent,
    rewardType: rewardType(theCells),
    posted: theCells[3].textContent,
    xpLoss: theCells[4].textContent,
  };
}
