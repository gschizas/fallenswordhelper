import getProfile from './ajax/getProfile';
import myStats from './ajax/myStats';
import * as common from './common/common';
import * as layout from './support/layout';
import * as system from './support/system';

var highlightPlayersNearMyLvl;
var lvlDiffToHighlight;
var myVL;
var spinner;
var validPvP = Math.floor(Date.now() / 1000) - 604800;

function doOnlineDot(aTable, data) {
  aTable.rows[0].insertAdjacentHTML('beforeend',
    '<td>' + layout.onlineDot({last_login: data.last_login}) + '</td>');
  if (myVL &&
      data.last_login >= validPvP &&
      data.virtual_level > myVL - lvlDiffToHighlight &&
      data.virtual_level < myVL + lvlDiffToHighlight) {
    aTable.parentNode.parentNode.classList.add('lvlHighlight');
  }
  //#if _DEV  //  get cloaked players
  var defender = common.playerDataObject(data);
  if (defender.cloakLevel !== 0) {console.log('data', data);} // eslint-disable-line no-console
  //#endif
}

function parsePlayer(aTable, data, jqXhr) {
  if (data) {
    doOnlineDot(aTable, data);
  } else {
    aTable.rows[0].insertAdjacentHTML('beforeend',
      '<td class="fshBkRed">' + jqXhr.status + '</td>');
  }
}

function failFilter(jqXhr) {
  return $.Deferred().resolve(null, jqXhr).promise();
}

function findOnlinePlayers() { // jQuery
  var someTables = layout.pCC.getElementsByTagName('table');
  var prm = [];
  for (var i = 4; i < someTables.length; i += 1) {
    prm.push(getProfile(someTables[i].textContent.trim())
      .pipe(null, failFilter)
      .done(parsePlayer.bind(null, someTables[i]))
    );
  }
  $.when.apply($, prm).done(function() {
    spinner.classList.add('fshHide');
  });
}

function getMyVL(e) { // jQuery
  $(e.target).qtip('hide');
  spinner = document.createElement('span');
  spinner.className = 'fshSpinner fshTopListSpinner';
  spinner.style.backgroundImage = 'url(\'' + system.imageServer +
    '/world/actionLoadingSpinner.gif\')';
  e.target.parentNode.replaceChild(spinner, e.target);
  if (highlightPlayersNearMyLvl) {
    myStats(false).done(function(data) {
      myVL = data.virtual_level;
      lvlDiffToHighlight = 11;
      if (myVL <= 205) {lvlDiffToHighlight = 6;}
    }).done(findOnlinePlayers);
  } else {findOnlinePlayers();}
}

function looksLikeTopRated() {
  highlightPlayersNearMyLvl =
    system.getValue('highlightPlayersNearMyLvl');
  var theCell = layout.pCC.getElementsByTagName('TD')[0];
  theCell.firstElementChild.className = 'fshTopListWrap';
  var findBtn = document.createElement('INPUT');
  findBtn.className = 'fshFindOnlinePlayers custombutton tip-static';
  findBtn.setAttribute('type', 'button');
  findBtn.setAttribute('value', 'Find Online Players');
  findBtn.setAttribute('data-tipped', 'Fetch the online status of the ' +
    'top 250 players (warning ... takes a few seconds).');
  theCell.insertBefore(findBtn, theCell.firstElementChild);
  findBtn.addEventListener('click', getMyVL);
}

export function injectTopRated() {
  if (layout.pCC &&
      layout.pCC.firstElementChild &&
      layout.pCC.firstElementChild.rows &&
      layout.pCC.firstElementChild.rows.length > 2 &&
      layout.pCC.firstElementChild.rows[1].textContent
        .indexOf('Last Updated') === 0) {looksLikeTopRated();}
}

export function globalQuest() {
  var topTable = layout.pCC.getElementsByTagName('table')[3];
  for (var i = 2; i < topTable.rows.length; i += 4) {
    var aCell = topTable.rows[i].cells[1];
    aCell.innerHTML = '<a href="index.php?cmd=findplayer' +
      '&search_show_first=1&search_active=1&search_username=' +
      aCell.textContent + '">' + aCell.textContent + '</a>';
  }
}
