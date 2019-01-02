import getArrayByTagName from './getArrayByTagName';

var guildId;

function getGuildId(el) {
  var match = el.textContent.match(/\s+guildId: ([0-9]+),/);
  if (match) {guildId = Number(match[1]);}
}

export default function currentGuildId() {
  if (!guildId) {
    getArrayByTagName('script', document.body).forEach(getGuildId);
  }
  return guildId;
}
