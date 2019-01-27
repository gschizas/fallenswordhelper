import createDocument from '../../system/createDocument';
import {createInput} from '../../common/cElement';
import {getElementById} from '../../common/getElement';
import getTextTrim from '../../common/getTextTrim';
import hideElement from '../../common/hideElement';
import insertElement from '../../common/insertElement';
import insertHtmlAfterBegin from '../../common/insertHtmlAfterBegin';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import on from '../../common/on';
import partial from '../../common/partial';
import querySelectorArray from '../../common/querySelectorArray';
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

function eachWeight(checkbox) {
  var privName = getTextTrim(checkbox.nextElementSibling);
  return privLookup[privName] || 1;
}

function sum(prev, curr) {
  return prev + curr;
}

function parseRankData(linkElement, responseText) {
  // Makes a weighted calculation of available permissions and gets tax rate
  var doc = createDocument(responseText);
  var checkBoxes =
    querySelectorArray('#pCC input[type="checkbox"]:checked', doc);
  var count = checkBoxes.map(eachWeight).reduce(sum, 0);
  var taxRate = doc.querySelector('#pCC input[name="rank_tax"]').value;
  insertHtmlAfterBegin(linkElement, '<span class="fshBlue">(' +
    Math.round(10 * count) / 10 + ') Tax:(' + taxRate + '%)</span> ');
}

function ajaxPerms(anItem) {
  var targetNode = anItem.parentNode.parentNode.previousElementSibling;
  var href = /window\.location='(.*)';/.exec(anItem.getAttribute('onclick'))[1];
  retryAjax(href).done(partial(parseRankData, targetNode));
}

function fetchRankData() { // jQuery.min
  var calcButton = getElementById('getrankweightings');
  hideElement(calcButton);
  querySelectorArray('#pCC input[value="Edit"]').forEach(ajaxPerms);
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
