import calf from './support/calf';
import * as debug from './support/debug';
import * as newMap from './newMap/newMap';
import * as system from './support/system';

var impStyles = [
  ' style="color:red; font-size:large; font-weight:bold"',
  ' style="color:Orangered; font-size:large; font-weight:bold"',
  ' style="color:Orangered; font-size:medium; font-weight:bold;"'
];

function getImpWarningStyle(impsRemaining) { // Legacy
  if (impsRemaining >= 0 && impsRemaining <= 2) {
    return impStyles[impsRemaining];
  }
  return ' style="color:green; font-size:medium;"';
}

function impWarning(impsRemaining) { // Legacy
  var applyImpWarningColor = getImpWarningStyle(impsRemaining);
  var recastButton = '';
  if (impsRemaining === 0) {
    recastButton = '&nbsp;<span id="Helper:recastImpAndRefresh" ' +
      'style="color: blue; cursor: pointer; text-decoration: underline; ' +
      'font-size: xx-small;">Recast</span>';
  }
  return '<tr><td' + applyImpWarningColor + '>Shield Imps Remaining: ' +
    impsRemaining + recastButton + '</td></tr>';
}

function getCaLvl(hasCounterAttack) { // Legacy
  var counterAttackLevel;
  if (hasCounterAttack.getAttribute('src').search('/skills/') !== -1) {
    var onmouseover = $(hasCounterAttack).data('tipped');
    var counterAttackRE = /<b>Counter Attack<\/b> \(Level: (\d+)\)/;
    var counterAttack = counterAttackRE.exec(onmouseover);
    if (counterAttack) {
      counterAttackLevel = counterAttack[1];
    }
  }
  return '<tr><td style="font-size:small; color:' +
    'blue">CA' + counterAttackLevel + ' active</td></tr>';
}

function hasCA() { // Legacy
  var replacementText = '';
  var hasCounterAttack = system
    .findNode('//img[contains(@src,"/54_sm.gif")]');
  if (hasCounterAttack) {
    replacementText += getCaLvl(hasCounterAttack);
  }
  return replacementText;
}

var doublerRE = /<b>Doubler<\/b> \(Level: (\d+)\)/;

function doublerLvl(onmouseover) { // Legacy
  var doubler = doublerRE.exec(onmouseover);
  if (doubler) {return doubler[1];}
}

function getDoublerLevel(hasDoubler) { // Legacy
  var doublerLevel;
  if (hasDoubler.getAttribute('src').search('/skills/') !== -1) {
    var onmouseover = $(hasDoubler).data('tipped');
    doublerLevel = doublerLvl(onmouseover);
  }
  if (doublerLevel === 200) { // ???
    return '<tr><td style="font-size:small; color:' +
      'red">Doubler ' + doublerLevel + ' active</td></tr>';
  }
  return '';
}

function hasDblr() { // Legacy
  var hasDoubler = system.findNode('//img[contains(@src,"/26_sm.gif")]');
  if (hasDoubler) {
    return getDoublerLevel(hasDoubler);
  }
  return '';
}

function getKillStreak(responseText) { // Hybrid
  var doc = system.createDocument(responseText);
  var killStreakLocation = $(doc).find('td:contains("Streak:"):last').next();
  debug.log('killStreakLocation', killStreakLocation);
  var playerKillStreakValue;
  if (killStreakLocation.length > 0) {
    playerKillStreakValue = system.intValue(killStreakLocation.text());
  }
  var killStreakElement = system.findNode('//span[@findme="killstreak"]');
  killStreakElement.innerHTML = system.addCommas(playerKillStreakValue);
  system.setValue('lastKillStreak', playerKillStreakValue);
  var deathDealerBuff =
    system.findNode('//img[contains(@data-tipped,"Death Dealer")]');
  var deathDealerRE = /<b>Death Dealer<\/b> \(Level: (\d+)\)/;
  var deathDealer = deathDealerRE.exec($(deathDealerBuff).data('tipped'));
  var deathDealerPercentage;
  if (deathDealer) {
    var deathDealerLevel = deathDealer[1];
    deathDealerPercentage = Math.min(Math.round(
      Math.floor(playerKillStreakValue / 5) * deathDealerLevel
    ) * 0.01, 20);
  }
  var deathDealerPercentageElement =
    system.findNode('//span[@findme="damagebonus"]');
  deathDealerPercentageElement.innerHTML = deathDealerPercentage;
  system.setValue('lastDeathDealerPercentage', deathDealerPercentage);
}

function getLastValue(pref) {
  var val = system.getValue(pref);
  if (typeof val === 'undefined') {
    system.setValue(pref, 0);
    val = 0;
  }
  return val;
}

function getTrackText(trackKillStreak) { // Legacy
  if (trackKillStreak) {return 'ON';}
  return 'off';
}

function doDeathDealer(impsRemaining) { // Legacy
  var lastDeathDealerPercentage = getLastValue('lastDeathDealerPercentage');
  var lastKillStreak = getLastValue('lastKillStreak');
  var trackKillStreak = system.getValue('trackKillStreak');
  var trackText = getTrackText(trackKillStreak);
  if (impsRemaining > 0 && lastDeathDealerPercentage === 20) {
    return '<tr><td style="font-size:small; color:black"' +
      '>Kill Streak: <span findme="killstreak">&gt;' +
      system.addCommas(lastKillStreak) + '</span> Damage bonus: <' +
      'span findme="damagebonus">20</span>%</td></tr>';
  }
  if (!trackKillStreak) {
    return '<tr><td style="font-size:small; color:' +
      'navy" nowrap>KillStreak tracker disabled. <span style="' +
      'font-size:xx-small">Track: <span id=Helper:toggleKS' +
      'tracker style="color:navy;cursor:pointer;text-' +
      'decoration:underline;" title="Click to toggle">' +
      trackText + '</span></span></td></tr>';
  }
  system.xmlhttp('index.php?cmd=profile', getKillStreak);
  return '<tr><td style="font-size:small; color:' +
    'navy" nowrap>KillStreak: <span findme="killstreak">' +
    system.addCommas(lastKillStreak) + '</span> Damage bonus' +
    ': <span findme="damagebonus">' +
    Math.round(lastDeathDealerPercentage * 100) / 100 +
    '</span>%&nbsp;<span style="font-size:xx-small">Track: ' +
    '<span id=Helper:toggleKStracker style="color:navy;' +
    'cursor:pointer;text-decoration:underline;" title="Click' +
    ' to toggle">' + trackText + '</span></span></td></tr>';
}

function recastImpAndRefresh(responseText) { // Legacy
  var doc = system.createDocument(responseText);
  if (doc) {
    location.reload();
  }
}

function toggleKsTracker() { // Legacy
  var trackKS = document.getElementById('Helper:toggleKStracker');
  if (trackKS) {
    trackKS.addEventListener('click', function() {
      system.setValue('trackKillStreak',
        !system.getValue('trackKillStreak'));
      location.reload();
    }, true);
  }
}

var hasShieldImp;
var hasDeathDealer;
var impsRemaining;
var re = /(\d+) HP remaining/;

function getImpHp() { // Legacy - Old Map
  impsRemaining = 0;
  if (hasShieldImp) {
    var textToTest = $(hasShieldImp).data('tipped');
    var impsRemainingRE = re.exec(textToTest);
    impsRemaining = impsRemainingRE[1];
  }
  var ret = impWarning(impsRemaining);
  if (hasDeathDealer) {
    ret += doDeathDealer(impsRemaining);
  }
  return ret;
}

function findImps() { // Legacy - Old Map
  if (hasDeathDealer || hasShieldImp) {
    return getImpHp();
  }
  return '';
}

function impRecast() { // Legacy - Old Map
  if ((hasDeathDealer || hasShieldImp) && impsRemaining === 0) {
    var _recastImpAndRefresh = document
      .getElementById('Helper:recastImpAndRefresh');
    var impHref = 'index.php?cmd=quickbuff&subcmd=activate&target' +
      'Players=' +
      $('dt.stat-name:first').next().text().replace(/,/g, '') +
      '&skills%5B%5D=55';
    _recastImpAndRefresh.addEventListener('click', function() {
      system.xmlhttp(impHref, recastImpAndRefresh, true);
    }, true);
  }
}

function checkBuffs() { // Legacy - Old Map
  // extra world screen text
  var replacementText = '<td background="' + system.imageServer +
    '/skin/realm_right_bg.jpg"><table align="right" cellpadding="1" ' +
    'style="width:270px;margin-left:38px;margin-right:38px;font-size' +
    ':medium; border-spacing: 1px; border-collapse: collapse;"><tr><' +
    'td colspan="2" height="10"></td></tr><tr>';
  hasShieldImp = system.findNode('//img[contains(@src,"/55_sm.gif")]');
  hasDeathDealer = system.findNode('//img[contains(@src,"/50_sm.gif")]');
  replacementText += findImps();
  replacementText += hasCA();
  replacementText += hasDblr();
  replacementText += calf.huntingMode === true ?
    '<tr><td style="font-size: small; color:red">' +
    'Hunting mode enabled</td></tr>' : '';
  replacementText += '<tr><td colspan="2" height="10"></td></tr>';
  replacementText += '</td>';

  var injectHere = system.findNode('//div[table[@class="centered" ' +
    'and @style="width: 270px;"]]');
  if (!injectHere) {return;}
  // insert after kill all monsters image and text
  var newSpan = document.createElement('DIV');
  newSpan.innerHTML = replacementText;
  injectHere.appendChild(newSpan);

  impRecast();
  toggleKsTracker();
}

function injectOldMap() { // Native
  checkBuffs();
}

export function injectWorld() { // Native
  // -1 = world page
  // 0 = quest responce
  // 1 = view creature
  // 2 = attack creature
  // 3 = attack player
  // 4 = move
  // 5 = use stair
  // 6 = use chest
  // 7 = take portal
  // 10 = problaby view relic
  // 11 = take relic
  // 12 = create group
  // 13 = view shop
  // 14 = purchase item
  // 15 = repair
  // 17 = login
  // 18 = username not found
  if (document.getElementById('worldPage')) { // new map
    newMap.subscribes();
  } else {
    // not new map.
    injectOldMap();
  }
}
