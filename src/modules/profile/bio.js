import * as layout from '../support/layout';
import * as system from '../support/system';

var buffCost = {count: 0, buffs: {}};
var bioEditLines;
var numRE = /[^a-zA-Z0-9.,+\- ]/g;
var priceRE =
  /([+-]{0,1}[.\d]+ *k)|([+-]{0,1}[.\d]+ *fsp)|([+-]{0,1}[.\d]+ *stam)/;

function expandBio() { // Native
  var bioExpander = document.getElementById('fshBioExpander');
  bioExpander.textContent =
    bioExpander.textContent === 'More ...' ? 'Less ...' : 'More ...';
  document.getElementById('fshBioHidden').classList.toggle('fshHide');
}

function compressBio(bioCell) { // Native
  var bioContents = bioCell.innerHTML;
  var maxCharactersToShow = system.getValue('maxCompressedCharacters');
  var maxRowsToShow = system.getValue('maxCompressedLines');
  var numberOfLines = bioContents.substr(0, maxCharactersToShow)
    .split(/<br>\n/).length - 1;
  if (bioContents.length <= maxCharactersToShow &&
      numberOfLines < maxRowsToShow) {return;}
  if (numberOfLines >= maxRowsToShow) {
    var startIndex = 0;
    while (maxRowsToShow > 0) {
      maxRowsToShow -= 1;
      startIndex = bioContents.indexOf('<br>\n', startIndex + 1);
    }
    maxCharactersToShow = startIndex;
  }

  // find the end of next HTML tag after the max characters to show.
  var breakPoint = bioContents.indexOf('<br>', maxCharactersToShow) + 4;
  var lineBreak = '';
  if (breakPoint === 3) {
    breakPoint = bioContents.indexOf(' ', maxCharactersToShow) + 1;
    if (breakPoint === 0) {return;}
    lineBreak = '<br>';
  }
  var bioStart = bioContents.substring(0, breakPoint);
  var bioEnd = bioContents.substring(breakPoint, bioContents.length);
  var extraOpenHTML = '';
  var extraCloseHTML = '';
  var tagList = ['b', 'i', 'u', 'span'];
  tagList.forEach(function(tag) {
    var closeTagIndex = bioEnd.indexOf('</' + tag + '>');
    var openTagIndex = bioEnd.indexOf('<' + tag + '>');
    if (closeTagIndex !== -1 && (openTagIndex > closeTagIndex ||
        openTagIndex === -1)) {
      extraOpenHTML += '<' + tag + '>';
      extraCloseHTML += '</' + tag + '>';
    }
  });
  bioCell.innerHTML = bioStart + extraCloseHTML + lineBreak +
    '<span id="fshBioExpander" class="reportLink">More ...</span><br>' +
    '<span class="fshHide" id="fshBioHidden">' + extraOpenHTML + bioEnd +
    '</span>';
  document.getElementById('fshBioExpander')
    .addEventListener('click', expandBio);
}

function getBuffsToBuy() { // Legacy
  if (buffCost.count === 0) {return;}
  var targetPlayer = layout.pCC
    .getElementsByTagName('h1');
  if (targetPlayer.length !== 0) {
    targetPlayer = targetPlayer[0].textContent;
  } else {
    targetPlayer = layout.playerName();
  }
  var buffsToBuy = Object.keys(buffCost.buffs).join(', ');
  var greetingText = system.getValue('buyBuffsGreeting').trim();
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

function formatCost(total) {
  var res = '';
  if (total.fsp > 0) {res = Math.round(total.fsp * 100) / 100 + ' FSP';}
  if (total.fsp > 0 && total.k > 0) {res += ' and ';}
  if (total.k > 0) {res += total.k + ' k';}
  if (total.stam > 0 && (total.fsp > 0 || total.k > 0)) {
    res += ' and ';
  }
  return res;
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

  var totalText = '';
  totalText += formatCost(total);
  if (total.stam > 0) {
    totalText += total.stam + ' Stam(' +
      Math.round(total.stam / 25 * 10) / 10 + 'fsp)';
  }
  if (total.unknown > 0) {
    totalText += ' (' + total.unknown + ' buff(s) with unknown cost)';
  }

  html += '</table><b>Total: ' + totalText + '</b>';
  document.getElementById('buffCost').innerHTML = '<br/><span ' +
    'class="tip-static" data-tipped="' + html + '">Estimated Cost: <b>' +
    totalText + '</b></span>';
  buffCost.buffCostTotalText = totalText;
}

function updateBuffCost() { // Legacy
  if (buffCost.count > 0) {
    hazBuffs();
  } else {
    document.getElementById('buffCost').innerHTML = '';
    buffCost.buffCostTotalText = '';
  }
}

function priceUnit(price) { // Native
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

function bioEvtHdl(e) { // Native
  if (e.target.classList.contains('buffLink')) {
    toggleBuffsToBuy(e);
    return;
  }
  if (e.target.id === 'fshSendBuffMsg') {
    getBuffsToBuy(e);
    return;
  }
  var buffNameNode = e.target;
  while (buffNameNode.tagName &&
      buffNameNode.tagName.toLowerCase() !== 'span') {
    buffNameNode = buffNameNode.parentNode;
  }
  if (buffNameNode.classList &&
      buffNameNode.classList.contains('buffLink')) {
    toggleBuffsToBuy(e);
  }
}

function bioPreview() { // Native
  var textArea = document.getElementById('textInputBox');
  var bioPreviewHTML = system.convertTextToHtml(textArea.value);
  textArea.parentNode.insertAdjacentHTML('beforeend', '<div>' +
    '<table align="center" width="325" border="1">' +
    '<tbody><tr><td style="text-align:center;color:#7D2252;' +
    'background-color:#CD9E4B">Preview</td></tr><tr>' +
    '<td align="left" width="325"><span id="biopreview">' +
    bioPreviewHTML + '</span></td></tr></tbody></table></div>');
}

function bioWords() { // Native
  // Add description text for the new tags
  layout.pCC.insertAdjacentHTML('beforeend', '<div>' +
    '`~This will allow FSH Script users to ' +
    'select buffs from your bio~`<br>You can use the [cmd] tag as well to ' +
    'determine where to put the "Ask For Buffs" button<br><br>' +
    '&nbsp;&nbsp;&nbsp;- Note 1: The ` and ~ characters are on the same ' +
    'key on QWERTY keyboards. ` is <b>NOT</b> an apostrophe.<br>' +
    '&nbsp;&nbsp;&nbsp;- Note 2: Inner text will not contain special ' +
    'characters (non-alphanumeric).<br>' +
    '&nbsp;&nbsp;&nbsp;- P.S. Be creative with these! Wrap your buff ' +
    'pack names in them to make buffing even easier!</div>');
}

function changeHeight() { // Native
  var theBox = document.getElementById('fshLinesToShow');
  var boxVal = parseInt(theBox.value, 10);
  if (isNaN(boxVal) || boxVal < '1' || boxVal > '99') {return;}
  bioEditLines = boxVal;
  system.setValue('bioEditLines', boxVal);
  document.getElementById('textInputBox').rows = bioEditLines;
}

function bioHeight() { // Native
  var bioEditLinesDiv = document.createElement('DIV');
  bioEditLinesDiv.insertAdjacentHTML('beforeend',
    ' Display <input id="fshLinesToShow"' +
    ' type="number" min="1" max="99" value="' +
    bioEditLines + '"/> Lines ');
  var saveLines = document.createElement('INPUT');
  saveLines.className = 'custombutton';
  saveLines.value = 'Update Rows To Show';
  saveLines.type = 'button';
  saveLines.addEventListener('click', changeHeight);
  bioEditLinesDiv.appendChild(saveLines);
  layout.pCC.appendChild(bioEditLinesDiv);
}

function renderBio(_bioContents) {
  var bioContents = _bioContents.replace(/\{b\}/g, '`~')
    .replace(/\{\/b\}/g, '~`');
  var buffs = bioContents.match(/`~([^~]|~(?!`))*~`/g);
  if (!buffs) {return;}
  buffs.forEach(function(buff, i) {
    var fullName = buff.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g, '');
    var cbString = '<span id="fshBuff' + i + '" class="buffLink fshBlue">' +
      fullName + '</span>';
    bioContents = bioContents.replace(buff, cbString);
  });
  if (bioContents.indexOf('[cmd]') < 0) {bioContents += '[cmd]';}
  bioContents = bioContents.replace('[cmd]',
    '<br><input id="fshSendBuffMsg" ' +
    'class="custombutton" type="button" value="Ask For Buffs">' +
    '<span id="buffCost" class="fshRed"></span>');
  return bioContents;
}

export function profileRenderBio(self) { // Native
  var bioCell = document.getElementById('profile-bio');
  if (!bioCell) {return;}
  if (self && system.getValue('renderSelfBio') ||
      !self && system.getValue('renderOtherBios')) {
    var bioContents = bioCell.innerHTML;
    bioContents = renderBio(bioContents);
    if (bioContents) {
      bioCell.innerHTML = bioContents;
    }
  }
  if (system.getValue('enableBioCompressor')) {compressBio(bioCell);}
  bioCell.addEventListener('click', bioEvtHdl);
}

function updateBioCharacters() { // Native
  var textArea = document.getElementById('textInputBox');
  var previewArea = document.getElementById('biopreview');
  var bioContents = system.convertTextToHtml(textArea.value);
  bioContents = renderBio(bioContents);
  if (bioContents) {
    previewArea.innerHTML = bioContents;
  }
}

export function injectBioWidgets() { // Native
  bioEditLines = system.getValue('bioEditLines');
  var textArea = document.getElementById('textInputBox');
  bioPreview();
  bioWords();
  bioHeight();
  textArea.rows = bioEditLines;
  textArea.classList.add('fshNoResize');

  textArea.parentNode.addEventListener('click', bioEvtHdl);
  textArea.addEventListener('keyup', updateBioCharacters);
  // Force the preview area to render
  updateBioCharacters();
}
