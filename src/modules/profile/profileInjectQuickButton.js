import getValue from '../system/getValue';
import {imageServer} from '../system/system';
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
    return '<a class="quickButton buttonJoinAll tip-static" ' +
      'href="' + joinallUrl + '" ' +
      'data-tipped="Join All Groups" style="background-image: url(\'' +
      imageServer +
      '/skin/icon_action_join.gif\');"></a>&nbsp;&nbsp;';
  }
  var maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
  return '<a class="quickButton buttonJoinUnder tip-static" href="' +
    joinUnderUrl + '" data-tipped="Join All Groups < ' + maxGroupSizeToJoin +
    ' Members" style="background-image: url(\'' + imageServer +
    '/skin/icon_action_join.gif\');"></a>&nbsp;&nbsp;';
}

function showRecallButton(playername) {
  if (currentGuildRelationship === 'self') {
    return '<a class="quickButton tip-static" href="' + recallUserUrl +
      playername + '" data-tipped="Recall items from ' + playername +
      '" style="background-image: url(\'' + imageServer +
      '/temple/3.gif\');"></a>&nbsp;&nbsp;';
  }
  return '';
}

function showRankButton(playerid, playername) {
  if (currentGuildRelationship === 'self' && getValue('showAdmin')) {
    return '<a class="quickButton buttonGuildRank tip-static" href="' +
      guildSubcmdUrl + 'members&subcmd2=changerank&member_id=' +
      playerid + '" data-tipped="Rank ' + playername +
      '" style="background-image: url(\'' + imageServer +
      '/guilds/' + guildId + '_mini.png\');"></a>&nbsp;&nbsp;';
  }
  return '';
}

export default function profileInjectQuickButton(avyImg, playerid, playername) {
  var newhtml = '<div align="center">';
  newhtml += '<a class="quickButton buttonQuickBuff tip-static" ' +
    quickBuffHref(playerid) + 'data-tipped="Buff ' + playername +
    '" style="background-image: url(\'' + imageServer +
    '/skin/realm/icon_action_quickbuff.gif\');"></a>&nbsp;&nbsp;';
  newhtml += joinGroups();
  newhtml += '<a class="quickButton tip-static" ' +
    'href="' + auctionhouseUrl + '&type=-3&tid=' + playerid +
    '" data-tipped="Go to ' + playername +
    '\'s auctions" style="background-image: url(\'' +
    imageServer + '/skin/gold_button.gif\');"></a>&nbsp;&nbsp;';
  newhtml += '<a class="quickButton tip-static" href="' + secureUrl +
    playername + '" data-tipped="Create Secure Trade to ' + playername +
    '" style="background-image: url(\'' + imageServer +
    '/temple/2.gif\');"></a>&nbsp;&nbsp;';
  newhtml += showRecallButton(playername);
  newhtml += showRankButton(playerid, playername);
  newhtml += '</div>';
  insertHtmlAfterEnd(avyImg, newhtml);
}
