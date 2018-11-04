import addCommas from '../../system/addCommas';
import createDocument from '../../system/createDocument';
import findNode from './findNode';
import getValue from '../../system/getValue';
import intValue from '../../system/intValue';
import isUndefined from '../../common/isUndefined';
import retryAjax from '../../ajax/retryAjax';
import setValue from '../../system/setValue';

var impStyles = [
  ' style="color:red; font-size:large; font-weight:bold"',
  ' style="color:Orangered; font-size:large; font-weight:bold"',
  ' style="color:Orangered; font-size:medium; font-weight:bold;"'
];

function getImpWarningStyle(impsRem) { // Legacy
  if (impsRem >= 0 && impsRem <= 2) {
    return impStyles[impsRem];
  }
  return ' style="color:green; font-size:medium;"';
}

function impWarning(impsRem) { // Legacy
  var applyImpWarningColor = getImpWarningStyle(impsRem);
  var recastButton = '';
  if (impsRem === 0) {
    recastButton = '&nbsp;<span id="Helper:recastImpAndRefresh" ' +
      'style="color: blue; cursor: pointer; text-decoration: underline; ' +
      'font-size: xx-small;">Recast</span>';
  }
  return '<tr><td' + applyImpWarningColor + '>Shield Imps Remaining: ' +
    impsRem.toString() + recastButton + '</td></tr>';
}

function getKillStreak(responseText) { // Hybrid
  var doc = createDocument(responseText);
  var killStreakLocation = $(doc).find('td:contains("Streak:"):last').next();
  //#if _DEV  //  killStreakLocation TODO WTF?
  console.log('killStreakLocation', killStreakLocation); // eslint-disable-line no-console
  //#endif
  var playerKillStreakValue;
  if (killStreakLocation.length > 0) {
    playerKillStreakValue = intValue(killStreakLocation.text());
  }
  var killStreakElement = findNode('//span[@findme="killstreak"]');
  killStreakElement.innerHTML = addCommas(playerKillStreakValue);
  setValue('lastKillStreak', playerKillStreakValue);
  var deathDealerBuff =
    findNode('//img[contains(@data-tipped,"Death Dealer")]');
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
    findNode('//span[@findme="damagebonus"]');
  deathDealerPercentageElement.innerHTML = deathDealerPercentage;
  setValue('lastDeathDealerPercentage', deathDealerPercentage);
}

function getLastValue(pref) {
  var val = getValue(pref);
  if (isUndefined(val)) {
    setValue(pref, 0);
    val = 0;
  }
  return val;
}

function getTrackText(trackKillStreak) { // Legacy
  if (trackKillStreak) {return 'ON';}
  return 'off';
}

function notMaxDd(lastDeathDealerPercentage, lastKillStreak) {
  var trackKillStreak = getValue('trackKillStreak');
  var trackText = getTrackText(trackKillStreak);
  if (!trackKillStreak) {
    return '<tr><td style="font-size:small; color:' +
      'navy" nowrap>KillStreak tracker disabled. <span style="' +
      'font-size:xx-small">Track: <span id=Helper:toggleKS' +
      'tracker style="color:navy;cursor:pointer;text-' +
      'decoration:underline;" title="Click to toggle">' +
      trackText + '</span></span></td></tr>';
  }
  retryAjax('index.php?no_mobile=1&cmd=profile').done(getKillStreak);
  return '<tr><td style="font-size:small; color:' +
    'navy" nowrap>KillStreak: <span findme="killstreak">' +
    addCommas(lastKillStreak) + '</span> Damage bonus' +
    ': <span findme="damagebonus">' +
    Math.round(lastDeathDealerPercentage * 100) / 100 +
    '</span>%&nbsp;<span style="font-size:xx-small">Track: ' +
    '<span id=Helper:toggleKStracker style="color:navy;' +
    'cursor:pointer;text-decoration:underline;" title="Click' +
    ' to toggle">' + trackText + '</span></span></td></tr>';
}

function doDeathDealer(impsRem) { // Legacy
  var lastDeathDealerPercentage = getLastValue('lastDeathDealerPercentage');
  var lastKillStreak = getLastValue('lastKillStreak');
  if (impsRem > 0 && lastDeathDealerPercentage === 20) {
    return '<tr><td style="font-size:small; color:black"' +
      '>Kill Streak: <span findme="killstreak">&gt;' +
      addCommas(lastKillStreak) + '</span> Damage bonus: <' +
      'span findme="damagebonus">20</span>%</td></tr>';
  }
  return notMaxDd(lastDeathDealerPercentage, lastKillStreak);
}

function getImpHp(hasDd, impsRem) { // Legacy - Old Map
  var ret = impWarning(impsRem);
  if (hasDd) {
    ret += doDeathDealer(impsRem);
  }
  return ret;
}

export default function findImps(hasDd, hasSsi, impsRem) { // Legacy - Old Map
  if (hasDd || hasSsi) {
    return getImpHp(hasDd, impsRem);
  }
  return '';
}
