import * as ajax from '../support/ajax';
import * as layout from '../support/layout';
import * as system from './system';

var drag_target;

function closestTable(el) { // Native
  if (el.tagName === 'TABLE') {return el;}
  return closestTable(el.parentNode);
}

function reduceStatTable(prev, curr, index) {
  var key = curr.cells[0].textContent.trim().replace(':', '');
  if (!key) {return prev;}
  prev[key] = {ind: index};
  if (curr.cells[1] && curr.cells[1].textContent) {
    prev[key].value = Number(
        curr.cells[1].textContent.trim().replace('+', '')
      );
  }
  return prev;
}

function getVal(prop, obj) {
  if (obj[prop] && obj[prop].value) {
    return obj[prop].value;
  }
  return 0;
}

function getLastIndex(obj, tbl) {
  if (obj.Enhancements) {
    return tbl.rows[obj.Enhancements.ind - 1];
  }
  return tbl.rows[tbl.rows.length - 1];
}

function addStats(el) {
  var statTable = closestTable(el);
  var statObj = Array.prototype.reduce.call(statTable.rows,
    reduceStatTable, {});
  var totalStats = getVal('Attack', statObj) + getVal('Defense', statObj) +
    getVal('Armor', statObj) + getVal('Damage', statObj) +
    getVal('HP', statObj);
  getLastIndex(statObj, statTable).insertAdjacentHTML('beforebegin',
    '<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">' +
    totalStats + '&nbsp;</td></tr>');
}

function fshDataFilter(data) { // Native
  var container = document.createElement('div');
  container.insertAdjacentHTML('beforeend', data);
  var bonus = container.getElementsByTagName('font');
  bonus = Array.prototype.filter.call(bonus, function(el) {
    return el.textContent === 'Bonuses';
  });
  bonus.forEach(addStats);
  return container.innerHTML;
}

function fshPreFilter(options) { // Native
  if (options.url.indexOf('fetchitem') !== 0) {return;}
  options.dataFilter = fshDataFilter;
}

export function addStatTotalToMouseover() { // jQuery
  $.ajaxPrefilter(fshPreFilter);
}

function drag_over(event) { // Native
  event.preventDefault();
  return false;
}

function drag_drop(event) { // Native
  var offset = event.dataTransfer.getData('text/plain').split(',');
  drag_target.style.left =
    event.clientX + parseInt(offset[0], 10) + 'px';
  drag_target.style.top =
    event.clientY + parseInt(offset[1], 10) + 'px';
  document.body.removeEventListener('dragover', drag_over, false);
  document.body.removeEventListener('drop', drag_drop, false);
  event.preventDefault();
  return false;
}

export function drag_start(event) { // Native
  drag_target = event.target;
  var style = window.getComputedStyle(event.target, null);
  event.dataTransfer.setData('text/plain',
    parseInt(style.getPropertyValue('left'), 10) - event.clientX + ',' +
    (parseInt(style.getPropertyValue('top'), 10) - event.clientY));
  document.body.addEventListener('dragover', drag_over, false);
  document.body.addEventListener('drop', drag_drop, false);
}

function getStat(stat, doc) { // jQuery
  // 'Hidden' returns NaN
  return system.intValue(
      $(stat, doc)
        .contents()
        .filter(function(i, e) {
          return e.nodeType === 3;
        })[0].nodeValue
    );
}

function getBuffLevel(doc, buff) { // jQuery
  var hasBuff = $('img.tip-static[data-tipped*="b>' + buff + '</b"]',
    doc);
  hasBuff = hasBuff.data('tipped');
  var re = new RegExp('</b> \\(Level: (\\d+)\\)');
  var test = re.exec(hasBuff);
  return test === null ? 0 : system.intValue(test[1]);
}

function getBonus(stat, doc) { // jQuery
  var target = $(stat, doc);
  var children = target.children();
  if (children.length === 0) {
    children = target.next();
  }
  return system.intValue(children.text().slice(2, -1));
}

function cloakGuess(bonus, level) { // Native
  if (bonus > level * 10 ||
      bonus < level) {
    return bonus;
  }
  return level * 10;
}

function playerDataString(responseText) { // Native
  var doc = system.createDocument(responseText);
  var obj = {
    levelValue: getStat('#stat-vl', doc),
    attackValue: getStat('#stat-attack', doc),
    defenseValue: getStat('#stat-defense', doc),
    armorValue: getStat('#stat-armor', doc),
    damageValue: getStat('#stat-damage', doc),
    hpValue: getStat('#stat-hp', doc),
    killStreakValue: getStat('#stat-kill-streak', doc),
    // get buffs here later ... DD, CA, DC, Constitution, etc
    counterAttackLevel: getBuffLevel(doc, 'Counter Attack'),
    doublerLevel: getBuffLevel(doc, 'Doubler'),
    deathDealerLevel: getBuffLevel(doc, 'Death Dealer'),
    darkCurseLevel: getBuffLevel(doc, 'Dark Curse'),
    holyFlameLevel: getBuffLevel(doc, 'Holy Flame'),
    constitutionLevel: getBuffLevel(doc, 'Constitution'),
    sanctuaryLevel: getBuffLevel(doc, 'Sanctuary'),
    flinchLevel: getBuffLevel(doc, 'Flinch'),
    nightmareVisageLevel: getBuffLevel(doc, 'Nightmare Visage'),
    superEliteSlayerLevel: getBuffLevel(doc, 'Super Elite Slayer'),
    fortitudeLevel: getBuffLevel(doc, 'Fortitude'),
    chiStrikeLevel: getBuffLevel(doc, 'Chi Strike'),
    terrorizeLevel: getBuffLevel(doc, 'Terrorize'),
    barricadeLevel: getBuffLevel(doc, 'Barricade'),
    reignOfTerrorLevel: getBuffLevel(doc, 'Reign Of Terror'),
    anchoredLevel: getBuffLevel(doc, 'Anchored'),
    severeConditionLevel: getBuffLevel(doc, 'Severe Condition'),
    entrenchLevel: getBuffLevel(doc, 'Entrench'),
    cloakLevel: getBuffLevel(doc, 'Cloak')
  };
  obj.superEliteSlayerMultiplier = Math.round(0.002 *
    obj.superEliteSlayerLevel * 100) / 100;

  if (obj.cloakLevel === 0 ||
      typeof obj.attackValue === 'number' &&
      !isNaN(obj.attackValue)) {
    return obj;
  }

  obj.attackBonus = getBonus('#stat-attack', doc);
  obj.defenseBonus = getBonus('#stat-defense', doc);
  obj.armorBonus = getBonus('#stat-armor', doc);
  obj.damageBonus = getBonus('#stat-damage', doc);
  obj.hpBonus = getBonus('#stat-hp', doc);

  obj.attackValue = cloakGuess(obj.attackBonus, obj.levelValue);
  obj.defenseValue = cloakGuess(obj.defenseBonus, obj.levelValue);
  obj.armorValue = cloakGuess(obj.armorBonus, obj.levelValue);
  obj.damageValue = cloakGuess(obj.damageBonus, obj.levelValue);
  obj.hpValue = obj.hpBonus;
  return obj;
}

function playerDataObject(responseText) { // Native
  var obj = {
    levelValue: responseText.level,
    attackValue: responseText.attack,
    defenseValue: responseText.defense,
    armorValue: responseText.armor,
    damageValue: responseText.damage,
    hpValue: responseText.hp,
    killStreakValue: system.intValue(responseText.killstreak)
  };
  return obj;
}

export function playerData(responseText) { // Native
  var obj = {};
  if (typeof responseText === 'string') {
    obj = playerDataString(responseText);
  }
  if (typeof responseText === 'object') {
    obj = playerDataObject(responseText);
  }
  return obj;
}

export function updateHCSQuickBuffLinks(selector) { // Native
  Array.prototype.forEach.call(document.querySelectorAll(selector),
    function(el) {
      el.setAttribute('href', el.getAttribute('href')
        .replace(/, 500/g, ', 1000'));
    }
  );
}

var inv;
var target;

function selectPerf() { // Native
  var items = document.getElementById(target + '-items')
    .getElementsByClassName('selectable-item');
  if (items.length === 0) {return;}
  Array.prototype.forEach.call(items, function(e) {
    var thisItem = e.id.replace(target + '-item-', '');
    if (inv[thisItem].craft === 'Perfect') {e.click();}
  });
}

function drawFilters(data) { // Native
  inv = data.items;
  var buttonDiv = document.createElement('div');
  buttonDiv.className = 'fshAC';
  buttonDiv.insertAdjacentHTML('beforeend',
    '<button class="fshBl">Perfect</button>');
  layout.pCC.appendChild(buttonDiv);
  buttonDiv.addEventListener('click', selectPerf);
}

export function perfFilter(loc) { // jQuery.min
  target = loc;
  ajax.getInventoryById().done(drawFilters);
}
