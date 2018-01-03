export default function renderBio(_bioContents) {
  var bioContents = _bioContents.replace(/\{b\}/g, '`~')
    .replace(/\{\/b\}/g, '~`');
  var buffs = bioContents.match(/`~([^~]|~(?!`))*~`/g);
  if (!buffs) {return _bioContents;}
  buffs.forEach(function(buff, i) {
    var fullName = buff.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g, '');
    var cbString = '<span id="fshBuff' + i + '" class="buffLink fshBlue">' +
      fullName + '</span>';
    bioContents = bioContents.replace(buff, cbString);
  });
  if (bioContents.indexOf('[cmd]') < 0) {bioContents += '[cmd]';}
  bioContents = bioContents.replace('[cmd]',
    '<br><input id="fshSendBuffMsg" ' +
    'class="custombutton" type="button" value="Ask For Buffs">' +
    '<span id="buffCost" class="fshRed"></span>');
  return bioContents;
}
