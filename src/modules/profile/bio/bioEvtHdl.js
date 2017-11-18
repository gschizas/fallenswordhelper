import {getElementById} from '../../common/getElement';
import {getValue} from '../../support/system';
import {pCC, playerName} from '../../support/layout';

var buffCost = {count: 0, buffs: {}};
var numRE = /[^a-zA-Z0-9.,+\- ]/g;
var priceRE =
  /([+-]{0,1}[.\d]+ *k)|([+-]{0,1}[.\d]+ *fsp)|([+-]{0,1}[.\d]+ *stam)/;

function getTargetPlayer() {
  var targetPlayer = pCC
    .getElementsByTagName('h1');
  if (targetPlayer.length !== 0) {
    targetPlayer = targetPlayer[0].textContent;
  } else {
    targetPlayer = playerName();
  }
  return targetPlayer;
}

function formatBuffsToBuy() { // Legacy
  var targetPlayer = getTargetPlayer();
  var buffsToBuy = Object.keys(buffCost.buffs).join(', ');
  var greetingText = getValue('buyBuffsGreeting').trim();
  var hasBuffTag = greetingText.indexOf('{buffs}') !== -1;
  var hasCostTag = greetingText.indexOf('{cost}') !== -1;
  greetingText = greetingText.replace(/{playername}/g, targetPlayer);
  if (!hasBuffTag) {
    greetingText += ' ' + buffsToBuy;
  } else if (!hasCostTag) {
    greetingText = greetingText
      .replace(/{buffs}/g, '`~' + buffsToBuy + '~`');
  } else {
    greetingText = greetingText
      .replace(/{buffs}/g, '`~' + buffsToBuy + '~`')
      .replace(/{cost}/g, buffCost.buffCostTotalText);
  }
  window.openQuickMsgDialog(targetPlayer, greetingText, '');
}

function getBuffsToBuy() { // Legacy
  if (buffCost.count > 0) {formatBuffsToBuy();}
}

var costFormatter = [
  {
    condition: function(total) {
      return total.fsp > 0;
    },
    result: function(total) {
      return String(Math.round(total.fsp * 100) / 100) + ' FSP';
    }
  },
  {
    condition: function(total) {
      return total.fsp > 0 && total.k > 0;
    },
    result: function() {
      return ' and ';
    }
  },
  {
    condition: function(total) {
      return total.k > 0;
    },
    result: function(total) {
      return total.k + ' k';
    }
  },
  {
    condition: function(total) {
      return total.stam > 0 && (total.fsp > 0 || total.k > 0);
    },
    result: function() {
      return ' and ';
    }
  },
  {
    condition: function(total) {
      return total.stam > 0;
    },
    result: function(total) {
      return total.stam + ' Stam(' +
        String(Math.round(total.stam / 25 * 10) / 10) + 'fsp)';
    }
  },
  {
    condition: function(total) {
      return total.unknown > 0;
    },
    result: function(total) {
      return ' (' + total.unknown + ' buff(s) with unknown cost)';
    }
  }
];

function formatCost(total) {
  return costFormatter.reduce(function(prev, el) {
    var ret = prev;
    if (el.condition(total)) {
      ret += el.result(total);
    }
    return ret;
  }, '');
}

function hazBuffs() { // Legacy
  var total = {k: 0, fsp: 0, stam: 0, unknown: 0};
  var html = 'This is an estimated cost based on how the script finds ' +
    'the cost associated with buffs from viewing bio.' +
    'It can be incorrect, please use with discretion.<br><hr>' +
    '<table border=0>';

  Object.keys(buffCost.buffs).forEach(function(buff) {
    total[buffCost.buffs[buff][1]] += buffCost.buffs[buff][0];
    html += '<tr><td>' + buff + '</td><td>: ' + buffCost.buffs[buff][0] +
      buffCost.buffs[buff][1] + '</td></tr>';
  });

  var totalText = formatCost(total);

  html += '</table><b>Total: ' + totalText + '</b>';
  getElementById('buffCost').innerHTML = '<br/><span ' +
    'class="tip-static" data-tipped="' + html + '">Estimated Cost: <b>' +
    totalText + '</b></span>';
  buffCost.buffCostTotalText = totalText;
}

function updateBuffCost() { // Legacy
  if (buffCost.count > 0) {
    hazBuffs();
  } else {
    getElementById('buffCost').innerHTML = '';
    buffCost.buffCostTotalText = '';
  }
}

function priceUnit(price) {
  if (price[0].indexOf('k') > 0) {
    return 'k';
  }
  if (price[0].indexOf('f') > 0) {
    return 'fsp';
  }
  return 'stam';
}

function priceBeforeName(buffNameNode, price) {
  if (!price) { // some players have prices BEFORE the buff names
    var newtext;
    var text = '';
    var node = buffNameNode;
    while (node && node.nodeName.toLowerCase() !== 'br') {
      newtext = node.textContent;
      node = node.previousSibling;
      text = newtext + text;
    }
    return text.replace(numRE, '').toLowerCase().match(priceRE);
  }
  return price;
}

function getBuffCost(buffNameNode) {
  var node = buffNameNode;
  var buffName = node.textContent;
  var newtext;
  var text = '';
  // get the whole line from the buff name towards the end (even after
  // the ',', in case of 'AL, Lib, Mer: 10k each'
  while (node && node.nodeName.toLowerCase() !== 'br') {
    newtext = node.textContent;
    node = node.nextSibling;
    text += newtext;
  }
  var price = text.replace(numRE, '').toLowerCase().match(priceRE);
  price = priceBeforeName(buffNameNode, price);
  var type;
  var cost;
  if (price) {
    type = priceUnit(price);
    cost = price[0].match(/([+-]{0,1}[.\d]+)/)[0];
  } else {
    type = 'unknown';
    cost = '1';
  }
  buffCost.buffs[buffName] = [parseFloat(cost), type];
  buffCost.count += 1;
}

function toggleBuffsToBuy(evt) { // Legacy
  // This is also called by bio preview
  var buffNameNode = evt.target;
  while (buffNameNode.tagName.toLowerCase() !== 'span') {
    buffNameNode = buffNameNode.parentNode;
  }
  var node = buffNameNode;
  var selected = node.classList.contains('fshBlue');
  node.classList.toggle('fshBlue');
  node.classList.toggle('fshYellow');
  var buffName = node.textContent;
  if (selected) {
    getBuffCost(buffNameNode);
  } else {
    buffCost.count -= 1;
    delete buffCost.buffs[buffName];
  }
  updateBuffCost();
}

function getBuffNameNode(e) {
  var buffNameNode = e.target;
  while (buffNameNode.tagName &&
      buffNameNode.tagName.toLowerCase() !== 'span') {
    buffNameNode = buffNameNode.parentNode;
  }
  return buffNameNode;
}

export default function bioEvtHdl(e) {
  var buffNameNode = getBuffNameNode(e);
  if (buffNameNode.classList &&
      buffNameNode.classList.contains('buffLink')) {
    toggleBuffsToBuy(e);
  } else if (e.target.id === 'fshSendBuffMsg') {
    getBuffsToBuy(e);
  }
}
