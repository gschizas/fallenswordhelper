import createDocument from '../../system/createDocument';
import {createInput} from '../../common/cElement';
import {getElementById} from '../../common/getElement';
import insertElement from '../../common/insertElement';
import insertHtmlAfterBegin from '../../common/insertHtmlAfterBegin';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import on from '../../common/on';
import partial from '../../common/partial';
import retryAjax from '../../ajax/retryAjax';

var privLookup = {
  'Bank Withdraw': 5,
  'Build/Upgrade/Demolish Structures': 5,
  'Can Un-Tag Items': 5,
  'Build/Upgrade Structures': 4,
  'Can Kick Members': 4,
  'Can Mass Messages': 0.5,
  'Take Items': 0.2,
  'Can Recall Tagged Items': 0.2,
  'Store Items': 0.1,
  'Can View Advisor': 0.1
};

function parseRankData(linkElement, responseText) {
  // Makes a weighted calculation of available permissions and gets tax rate
  var doc = createDocument(responseText);
  var checkBoxes = doc.querySelectorAll(
    '#pCC input[type="checkbox"]:checked');
  var count = 0;
  Array.prototype.forEach.call(checkBoxes, function(checkbox) {
    var privName = checkbox.nextElementSibling.textContent.trim();
    if (privName in privLookup) {
      count += privLookup[privName];
    } else {count += 1;}
  });
  var taxRate = doc.querySelector('#pCC input[name="rank_tax"]').value;
  insertHtmlAfterBegin(linkElement, '<span class="fshBlue">(' +
    Math.round(10 * count) / 10 + ') Tax:(' + taxRate + '%)</span> ');
}

function fetchRankData() { // jQuery.min
  var calcButton = getElementById('getrankweightings');
  calcButton.classList.add('fshHide');
  var allItems = document.querySelectorAll('#pCC input[value="Edit"]');
  Array.prototype.forEach.call(allItems, function(anItem) {
    var targetNode = anItem.parentNode.parentNode.previousElementSibling;
    var href = /window\.location='(.*)';/.exec(anItem
      .getAttribute('onclick'))[1];
    retryAjax(href).done(partial(parseRankData, targetNode));
  });
}

export default function weightings() {
  // gather rank info button
  var addNewRank = document.querySelector('#pCC a[href*="=ranks&subcmd2=add"]');
  if (addNewRank) {
    var weightButton = createInput({
      id: 'getrankweightings',
      className: 'custombutton',
      type: 'button',
      value: 'Get Rank Weightings'
    });
    on(weightButton, 'click', fetchRankData);
    var theTd = addNewRank.parentNode.parentNode;
    insertHtmlBeforeEnd(theTd, '&nbsp;');
    insertElement(theTd, weightButton);
  }
}
