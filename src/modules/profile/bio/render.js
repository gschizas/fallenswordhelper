function buffToggles(prev, buff, i) {
  return prev.replace(buff, '<span id="fshBuff' + i +
    '" class="buffLink fshBlue">' +
    buff.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g, '') + '</span>');
}

export default function renderBio(_bioContents) {
  var bioContents = _bioContents.replace(/\{b\}/g, '`~')
    .replace(/\{\/b\}/g, '~`');
  var buffs = bioContents.match(/`~([^~]|~(?!`))*~`/g);
  if (!buffs) {return _bioContents;}
  bioContents = buffs.reduce(buffToggles, bioContents);
  if (bioContents.indexOf('[cmd]') < 0) {bioContents += '[cmd]';}
  bioContents = bioContents.replace('[cmd]',
    '<br><input id="fshSendBuffMsg" ' +
    'class="custombutton" type="button" value="Ask For Buffs">' +
    '<span id="buffCost" class="fshRed"></span>');
  return bioContents;
}
