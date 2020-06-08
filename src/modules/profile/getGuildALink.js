import { guildViewUrl } from '../support/constants';
import querySelector from '../common/querySelector';

let haveGuildALink;
let guildALink;

export default function getGuildALink() {
  if (!haveGuildALink) {
    guildALink = querySelector(`#pCC a[href^="${guildViewUrl}"]`);
    haveGuildALink = true;
  }
  return guildALink;
}
