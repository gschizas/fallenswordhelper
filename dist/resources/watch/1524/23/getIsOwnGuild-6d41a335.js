import { D as querySelector, bq as guildViewUrl, bo as guildRE } from './calfSystem-2b1fed3f.js';
import { c as currentGuildId } from './currentGuildId-e952c248.js';

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
//# sourceMappingURL=getIsOwnGuild-6d41a335.js.map
