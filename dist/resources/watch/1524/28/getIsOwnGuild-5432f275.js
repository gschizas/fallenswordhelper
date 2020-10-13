import { D as querySelector, bn as guildViewUrl, bl as guildRE } from './calfSystem-21d16a0e.js';
import { c as currentGuildId } from './currentGuildId-ce8bf3c5.js';

let haveGuildALink;
let guildALink;

function getGuildALink() {
  if (!haveGuildALink) {
    guildALink = querySelector(`#pCC a[href^="${guildViewUrl}"]`);
    haveGuildALink = true;
  }
  return guildALink;
}

let haveIsOwnGuild;
let isOwnGuild;

function findGuildId() {
  const guildALink = getGuildALink();
  if (guildALink) {
    const matches = guildRE.exec(guildALink.href);
    if (matches) { return Number(matches[1]); }
  }
}

function getIsOwnGuild() {
  if (!haveIsOwnGuild) {
    isOwnGuild = findGuildId() === currentGuildId();
    haveIsOwnGuild = true;
  }
  return isOwnGuild;
}

export { getIsOwnGuild as a, getGuildALink as g };
//# sourceMappingURL=getIsOwnGuild-5432f275.js.map
