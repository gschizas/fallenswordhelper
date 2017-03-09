import calf from './support/calf';
import * as debug from './support/debug';
import * as fshGa from './support/fshGa';
import * as guildAdvisor from './guildAdvisor';
import * as newMap from './newMap/newMap';
import * as oldRelic from './oldRelic';
import * as questBook from './questBook';
import * as quickBuff from './quickBuff';
import * as recipes from './recipes';
import * as system from './support/system';

function impWarning(impsRemaining) { // Legacy
  var applyImpWarningColor = ' style="color:green; ' +
    'font-size:medium;"';
  if (impsRemaining === 2) {
    applyImpWarningColor = ' style="color:Orangered; ' +
      'font-size:medium; font-weight:bold;"';
  }
  if (impsRemaining === 1) {
    applyImpWarningColor = ' style="color:Orangered; ' +
      'font-size:large; font-weight:bold"';
  }
  if (impsRemaining === 0) {
    applyImpWarningColor = ' style="color:red; ' +
      'font-size:large; font-weight:bold"';
  }
  return '<tr><td' + applyImpWarningColor +
    '>Shield Imps Remaining: ' + impsRemaining +
    (impsRemaining === 0 ?
    '&nbsp;<span id="Helper:recastImpAndRefresh" style="color:' +
    'blue;cursor:pointer;text-decoration:underline;font-size:' +
    'xx-small;">Recast</span>' : '') + '</td></tr>';
}

function hasCA() { // Legacy
  var replacementText = '';
  var hasCounterAttack = system
    .findNode('//img[contains(@src,"/54_sm.gif")]');
  if (hasCounterAttack) {
    var counterAttackLevel;
    if (hasCounterAttack.getAttribute('src').search('/skills/') !== -1) {
      var onmouseover = $(hasCounterAttack).data('tipped');
      var counterAttackRE = /<b>Counter Attack<\/b> \(Level: (\d+)\)/;
      var counterAttack = counterAttackRE.exec(onmouseover);
      if (counterAttack) {
        counterAttackLevel = counterAttack[1];
      }
    }
    replacementText += '<tr><td style="font-size:small; color:' +
      'blue">CA' + counterAttackLevel + ' active</td></tr>';
  }
  return replacementText;
}

function hasDblr() { // Legacy
  var replacementText = '';
  var hasDoubler = system.findNode('//img[contains(@src,"/26_sm.gif")]');
  if (hasDoubler) {
    var doublerLevel;
    if (hasDoubler.getAttribute('src').search('/skills/') !== -1) {
      var onmouseover = $(hasDoubler).data('tipped');
      var doublerRE = /<b>Doubler<\/b> \(Level: (\d+)\)/;
      var doubler = doublerRE.exec(onmouseover);
      if (doubler) {
        doublerLevel = doubler[1];
      }
    }
    if (doublerLevel === 200) {
      replacementText += '<tr><td style="font-size:small; color:' +
        'red">Doubler ' + doublerLevel + ' active</td></tr>';
    }
  }
  return replacementText;
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

function doDeathDealer(impsRemaining) { // Legacy
  var replacementText = '';

  var lastDeathDealerPercentage =
    system.getValue('lastDeathDealerPercentage');
  if (typeof lastDeathDealerPercentage === 'undefined') {
    system.setValue('lastDeathDealerPercentage', 0);
    lastDeathDealerPercentage = 0;
  }

  var lastKillStreak = system.getValue('lastKillStreak');
  if (typeof lastKillStreak === 'undefined') {
    system.setValue('lastKillStreak', 0);
    lastKillStreak = 0;
  }

  var trackKillStreak = system.getValue('trackKillStreak');

  if (impsRemaining > 0 && lastDeathDealerPercentage === 20) {
    replacementText += '<tr><td style="font-size:small; color:black"' +
      '>Kill Streak: <span findme="killstreak">&gt;' +
      system.addCommas(lastKillStreak) + '</span> Damage bonus: <' +
      'span findme="damagebonus">20</span>%</td></tr>';
  } else if (!trackKillStreak) {
    replacementText += '<tr><td style="font-size:small; color:' +
      'navy" nowrap>KillStreak tracker disabled. <span style="' +
      'font-size:xx-small">Track: <span id=Helper:toggleKS' +
      'tracker style="color:navy;cursor:pointer;text-' +
      'decoration:underline;" title="Click to toggle">' +
      (trackKillStreak ? 'ON' : 'off') +
      '</span></span></td></tr>';
  } else {
    replacementText += '<tr><td style="font-size:small; color:' +
      'navy" nowrap>KillStreak: <span findme="killstreak">' +
      system.addCommas(lastKillStreak) + '</span> Damage bonus' +
      ': <span findme="damagebonus">' +
      Math.round(lastDeathDealerPercentage * 100) / 100 +
      '</span>%&nbsp;<span style="font-size:xx-small">Track: ' +
      '<span id=Helper:toggleKStracker style="color:navy;' +
      'cursor:pointer;text-decoration:underline;" title="Click' +
      ' to toggle">' + (trackKillStreak ? 'ON' : 'off') +
      '</span></span></td></tr>';
    system.xmlhttp('index.php?cmd=profile', getKillStreak);
  }
  return replacementText;
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

function checkBuffs() { // Legacy - Old Map
  var impsRemaining;

  // extra world screen text
  var replacementText = '<td background="' + system.imageServer +
    '/skin/realm_right_bg.jpg"><table align="right" cellpadding="1" ' +
    'style="width:270px;margin-left:38px;margin-right:38px;font-size' +
    ':medium; border-spacing: 1px; border-collapse: collapse;"><tr><' +
    'td colspan="2" height="10"></td></tr><tr>';
  var hasShieldImp = system
    .findNode('//img[contains(@src,"/55_sm.gif")]');
  var hasDeathDealer = system
    .findNode('//img[contains(@src,"/50_sm.gif")]');
  if (hasDeathDealer || hasShieldImp) {
    var re = /(\d+) HP remaining/;
    impsRemaining = 0;
    if (hasShieldImp) {
      var textToTest = $(hasShieldImp).data('tipped');
      var impsRemainingRE = re.exec(textToTest);
      impsRemaining = impsRemainingRE[1];
    }
    replacementText += impWarning(impsRemaining);
    if (hasDeathDealer) {
      replacementText += doDeathDealer(impsRemaining);
    }
  }
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

export function unknownPage() { // Legacy
  if (typeof window.jQuery === 'undefined') {return;}
  //#if _DEV  //  unknownPage
  console.log('unknownPage'); // eslint-disable-line no-console
  //#endif

  if ($('#pCC td:contains("Below is the current status for ' +
    'the relic")').length > 0) {
    fshGa.screenview('unknown.oldRelic.injectRelic');
    oldRelic.injectRelic();
    return;
  }

  var isBuffResult = document.getElementById('quickbuff-report');
  if (isBuffResult) {
    fshGa.screenview('unknown.quickBuff.updateBuffLog');
    quickBuff.updateBuffLog();
    return;
  }

  var isQuestBookPage = system.findNode('//td[.="Quest Name"]');
  if (isQuestBookPage) {
    fshGa.screenview('unknown.questBook.injectQuestBookFull');
    questBook.injectQuestBookFull();
    return;
  }

  var isAdvisorPageClue1 = system.findNode('//font[@size=2 and .="Advisor"]');
  var clue2 = '//a[@href="index.php?cmd=guild&amp;subcmd=manage" ' +
    'and .="Back to Guild Management"]';
  var isAdvisorPageClue2 = system.findNode(clue2);
  if (isAdvisorPageClue1 && isAdvisorPageClue2) {
    fshGa.screenview('unknown.guildAdvisor.injectAdvisor');
    guildAdvisor.injectAdvisor();
    return;
  }

  // if (system.findNode('//a[.="Back to Scavenging"]')) {
    // fshGa.screenview('unknown.scavenging.injectScavenging');
    // FSH.scavenging.injectScavenging(); // Is this used???
  // }

  if ($('#pCC img[title="Inventing"]').length > 0) {
    fshGa.screenview('unknown.recipes.inventing');
    recipes.inventing();
    return;
  }
  //#if _DEV  //  Fell through!
  console.log('Fell through!'); // eslint-disable-line no-console
  //#endif
}
