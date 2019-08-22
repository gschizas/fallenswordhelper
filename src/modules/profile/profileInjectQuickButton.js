import {cdn} from '../system/system';
import getValue from '../system/getValue';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import quickBuffHref from '../common/quickBuffHref';
import {
  auctionhouseUrl,
  guildSubcmdUrl,
  joinUnderUrl,
  joinallUrl,
  recallUserUrl,
  secureUrl
} from '../support/constants';
import {currentGuildRelationship, guildId} from './profileInjectGuildRel';

function joinGroups() {
  if (!getValue('enableMaxGroupSizeToJoin')) {
    return '<a class="quickButton buttonJoinAll tip-static fshJoin" ' +
      'href="' + joinallUrl + '" ' +
      'data-tipped="Join All Groups"></a>&nbsp;&nbsp;';
  }
  var maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
  return '<a class="quickButton buttonJoinUnder tip-static fshJoin" href="' +
    joinUnderUrl + '" data-tipped="Join All Groups < ' + maxGroupSizeToJoin +
    ' Members"></a>&nbsp;&nbsp;';
}

function showRecallButton(playername) {
  if (currentGuildRelationship === 'self') {
    return '<a class="quickButton tip-static fshTempleThree" href="' +
      recallUserUrl + playername + '" data-tipped="Recall items from ' +
      playername + '"></a>&nbsp;&nbsp;';
  }
  return '';
}

function showRankButton(playerid, playername) {
  if (currentGuildRelationship === 'self' && getValue('showAdmin')) {
    return '<a class="quickButton buttonGuildRank tip-static" href="' +
      guildSubcmdUrl + 'members&subcmd2=changerank&member_id=' +
      playerid + '" data-tipped="Rank ' + playername +
      '" style="background-image: url(\'' + cdn +
      'guilds/' + guildId + '_mini.png\');"></a>&nbsp;&nbsp;';
  }
  return '';
}

export default function profileInjectQuickButton(avyImg, playerid, playername) {
  var newhtml = '<div align="center">';
  newhtml += '<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ' +
    quickBuffHref(playerid) + 'data-tipped="Buff ' + playername +
    '"></a>&nbsp;&nbsp;';
  newhtml += joinGroups();
  newhtml += '<a class="quickButton tip-static fshGold" ' +
    'href="' + auctionhouseUrl + '&type=-3&tid=' + playerid +
    '" data-tipped="Go to ' + playername +
    '\'s auctions"></a>&nbsp;&nbsp;';
  newhtml += '<a class="quickButton tip-static fshTempleTwo" href="' +
    secureUrl + playername + '" data-tipped="Create Secure Trade to ' +
    playername + '"></a>&nbsp;&nbsp;';
  newhtml += showRecallButton(playername);
  newhtml += showRankButton(playerid, playername);
  newhtml += '</div>';
  insertHtmlAfterEnd(avyImg, newhtml);
}
