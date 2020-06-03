import { k as getArrayByTagName, A as getText } from './calfSystem-03895320.js';

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
//# sourceMappingURL=currentGuildId-2be1b92f.js.map
