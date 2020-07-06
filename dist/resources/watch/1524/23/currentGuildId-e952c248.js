import { m as getArrayByTagName, B as getText } from './calfSystem-2b1fed3f.js';

let guildId;

function getGuildId(el) {
  const match = getText(el).match(/\s+guildId: ([0-9]+),/);
  if (match) { guildId = Number(match[1]); }
}

function currentGuildId() {
  if (!guildId) {
    getArrayByTagName('script', document.body).forEach(getGuildId);
  }
  return guildId;
}

export { currentGuildId as c };
//# sourceMappingURL=currentGuildId-e952c248.js.map
