import { D as querySelector, bq as guildViewUrl, bo as guildRE } from './calfSystem-0ffc234f.js';
import { c as currentGuildId } from './currentGuildId-a05aee13.js';

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
//# sourceMappingURL=getIsOwnGuild-c2b2bb71.js.map
