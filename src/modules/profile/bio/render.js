function buffToggles(acc, buff, i) {
  return acc.replace(buff, `<span id="fshBuff${
    i}" class="buffLink fshBlue">${
    buff.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g, '')}</span>`);
}

export default function renderBio(_bioContents) {
  let bioContents = _bioContents.replace(/\{b\}/g, '`~')
    .replace(/\{\/b\}/g, '~`');
  const buffs = bioContents.match(/`~([^~]|~(?!`))*~`/g);
  if (!buffs) { return _bioContents; }
  bioContents = buffs.reduce(buffToggles, bioContents);
  if (bioContents.indexOf('[cmd]') < 0) { bioContents += '[cmd]'; }
  bioContents = bioContents.replace('[cmd]',
    '<br><input id="fshSendBuffMsg" '
    + 'class="custombutton" type="button" value="Ask For Buffs"><br>'
    + '<span id="buffCost" class="fshRed">&nbsp;</span>');
  return bioContents;
}
