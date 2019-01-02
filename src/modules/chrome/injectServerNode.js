import {createDiv} from '../common/cElement';
import {getElementById} from '../common/getElement';
import insertElement from '../common/insertElement';
import querySelectorArray from '../common/querySelectorArray';
import toggleForce from '../common/toggleForce';

function doServerNode(topbannerStats, miniboxList) {
  var nodeName = miniboxList.children[7].textContent;
  var serverDiv = createDiv({
    className: 'tip-static',
    dataset: {tipped: 'Server'},
    textContent: 'Server: ' + nodeName
  });
  insertElement(topbannerStats, serverDiv);
}

function doOnlinePlayers(topbannerStats, miniboxList) {
  var playersOnline = miniboxList.children[3].innerHTML;
  var bannerPlayers = topbannerStats.children[0];
  bannerPlayers.innerHTML = 'Online: ' + playersOnline;
}

function statBoxesExist(topbannerStats, gameStats) {
  var miniboxList = gameStats.nextElementSibling.children[0];
  if (miniboxList.children.length === 8) {
    doServerNode(topbannerStats, miniboxList);
    doOnlinePlayers(topbannerStats, miniboxList);
    toggleForce(gameStats.parentNode, true);
  }
}

function validStatBoxes(topbannerStats, gameStats) {
  var hidden = topbannerStats.classList.contains('topbanner-stats-hidden');
  return topbannerStats && !hidden && gameStats;
}

function isGameStats(el) {
  return el.textContent === 'Game Stats';
}

export default function injectServerNode() {
  var topbannerStats = getElementById('topbanner-stats');
  var gameStats = querySelectorArray('#pCR h3').find(isGameStats);
  if (validStatBoxes(topbannerStats, gameStats)) {
    statBoxesExist(topbannerStats, gameStats);
  }
}
