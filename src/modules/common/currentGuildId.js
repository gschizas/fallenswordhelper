var guildId;

export default function currentGuildId() {
  if (!guildId) {
    var nodeList = document.body.getElementsByTagName('script');
    Array.prototype.forEach.call(nodeList, function getGuildId(el) {
      var match = el.textContent.match(/\s+guildId: ([0-9]+),/);
      if (match) {guildId = Number(match[1]);}
    });
  }
  return guildId;
}
