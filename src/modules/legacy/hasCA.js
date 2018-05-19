import findNode from './findNode';

function getCaLvl(hasCounterAttack) { // Legacy
  var counterAttackLevel;
  if (hasCounterAttack.getAttribute('src').search('/skills/') !== -1) {
    var onmouseover = $(hasCounterAttack).data('tipped');
    var counterAttackRE = /<b>Counter Attack<\/b> \(Level: (\d+)\)/;
    var counterAttack = counterAttackRE.exec(onmouseover);
    if (counterAttack) {
      counterAttackLevel = counterAttack[1];
    }
  }
  return '<tr><td style="font-size:small; color:' +
    'blue">CA' + counterAttackLevel + ' active</td></tr>';
}

export default function hasCA() { // Legacy
  var replacementText = '';
  var hasCounterAttack = findNode('//img[contains(@src,"/54_sm.gif")]');
  if (hasCounterAttack) {
    replacementText += getCaLvl(hasCounterAttack);
  }
  return replacementText;
}
