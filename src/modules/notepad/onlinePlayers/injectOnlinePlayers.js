import buildOnlinePlayerData from './buildOnlinePlayerData';
import {calculateBoundaries} from '../../common/levelHighlight';
import changeLvl from './changeLvl';
import createDocument from '../../system/createDocument';
import doRefreshButton from './doRefreshButton';
import {doTable} from './doTable';
import filterHeaderOnlinePlayers from './filterHeaderOnlinePlayers';
import getForage from '../../ajax/getForage';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import {now} from '../../support/constants';
import on from '../../common/on';
import onlinePlayersPage from '../../ajax/onlinePlayersPage';
import partial from '../../common/partial';
import resetEvt from './resetEvt';
import setForage from '../../ajax/setForage';
import setValue from '../../system/setValue';

var context;
var onlinePlayers;
var onlinePages;
var lastPage;

function gotOnlinePlayers(value) { // jQuery
  onlinePlayers = value || {};
  filterHeaderOnlinePlayers(context);
  calculateBoundaries();
  doTable(context, buildOnlinePlayerData(onlinePlayers));
}

function checkLastPage() {
  if (onlinePages === lastPage) {
    setForage('fsh_onlinePlayers', onlinePlayers);
    gotOnlinePlayers(onlinePlayers);
  }
}

function seenPlayer(player, thePage) {
  return onlinePlayers[player] && onlinePlayers[player][3] > thePage;
}

function playerRecord(thePage, index, tds) {
  return [
    tds.eq(0).html(),
    tds.eq(1).html(),
    tds.eq(2).text(),
    thePage,
    index
  ];
}

function buildElements(thePage, index, element) {
  var tds = $('td', $(element));
  var player = tds.eq(1).text();
  if (seenPlayer(player, thePage)) {return;}
  onlinePlayers[player] = playerRecord(thePage, index, tds);
}

function processTheRows(doc, input) {
  var thePage = input.attr('value');
  var theRows = $('#pCC img[src$="/skin/icon_action_view.gif',
    doc).parent().parent().parent();
  theRows.each(partial(buildElements, thePage));
}

function getLastPage(input) {
  return parseInt(input.parent().text().match(/(\d+)/g)[0], 10);
}

function getOtherPages(callback, input) {
  lastPage = getLastPage(input);
  for (var i = 2; i <= lastPage; i += 1) {
    onlinePlayersPage(i).done(callback);
  }
}

function updateStatus(text) {
  $('#fshOutput', context).append(text);
}

function getOnlinePlayers(data) { // Bad jQuery
  updateStatus(' ' + (onlinePages + 1));
  var doc = createDocument(data);
  var input = $('#pCC input.custominput', doc).first();
  processTheRows(doc, input);
  onlinePages += 1;
  if (onlinePages === 1) {
    getOtherPages(getOnlinePlayers, input);
  }
  checkLastPage();
}

function refreshEvt() { // Bad jQuery
  $('#fshRefresh', context).hide();
  onlinePages = 0;
  onlinePlayers = {};
  onlinePlayersPage(1).done(getOnlinePlayers);
  setValue('lastOnlineCheck', now);
  updateStatus('Parsing online players...');
}

function clickHandler(e) {
  if (e.target.id === 'fshRefresh') {refreshEvt();}
  if (e.target.id === 'fshReset') {resetEvt(context);}
}

function injectOnlinePlayersNew() { // jQuery
  context.html(
    '<span><b>Online Players</b></span>' + doRefreshButton() +
    '<div id="fshOutput"></div>');
  getForage('fsh_onlinePlayers').done(gotOnlinePlayers);
  on(context[0], 'click', clickHandler);
  on(context[0], 'keyup', changeLvl);
}

export default function injectOnlinePlayers(content) { // jQuery
  if (jQueryNotPresent()) {return;}
  if (content) {
    context = $(content);
  } else {
    context = $('#pCC');
  }
  injectOnlinePlayersNew();
}
