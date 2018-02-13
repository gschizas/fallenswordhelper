import findNode from '../system/findNode';

var doublerRE = /<b>Doubler<\/b> \(Level: (\d+)\)/;

function doublerLvl(onmouseover) { // Legacy
  var doubler = doublerRE.exec(onmouseover);
  if (doubler) {return doubler[1];}
}

function getDoublerLevel(hasDoubler) { // Legacy
  var doublerLevel;
  if (hasDoubler.getAttribute('src').search('/skills/') !== -1) {
    var onmouseover = $(hasDoubler).data('tipped');
    doublerLevel = doublerLvl(onmouseover);
  }
  if (doublerLevel === 200) { // ???
    return '<tr><td style="font-size:small; color:' +
      'red">Doubler ' + doublerLevel + ' active</td></tr>';
  }
  return '';
}

export default function hasDblr() { // Legacy
  var hasDoubler = findNode('//img[contains(@src,"/26_sm.gif")]');
  if (hasDoubler) {
    return getDoublerLevel(hasDoubler);
  }
  return '';
}
