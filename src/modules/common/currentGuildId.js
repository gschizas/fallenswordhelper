export default function currentGuildId() {
  var guildId;
  var nodeList = document.body.getElementsByTagName('script');
  Array.prototype.forEach.call(nodeList, function getGuildId(el) {
    var match = el.textContent.match(/\s+guildId: ([0-9]+),/);
    if (match) {guildId = parseInt(match[1], 10);}
  });
  return guildId;
}
