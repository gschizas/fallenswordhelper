import querySelector from '../common/querySelector';

function wrapUrl(guildLogo) {
  var url = guildLogo.nextElementSibling.nextElementSibling;
  if (url) {url.classList.add('fshBreakAll');}
}

export default function removeGuildAvyImgBorder() {
  var guildLogo = querySelector('#pCC img[src*="/guilds/"][width="200"]');
  if (!guildLogo) {return;}
  guildLogo.removeAttribute('style');
  wrapUrl(guildLogo);
}
