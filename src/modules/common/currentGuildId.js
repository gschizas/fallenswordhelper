import getElementsByTagName from './getElementsByTagName';

var guildId;

function getGuildId(el) {
  var match = el.textContent.match(/\s+guildId: ([0-9]+),/);
  if (match) {guildId = Number(match[1]);}
}

export default function currentGuildId() {
  if (!guildId) {
    var nodeList = getElementsByTagName('script', document.body);
    Array.prototype.forEach.call(nodeList, getGuildId);
  }
  return guildId;
}
