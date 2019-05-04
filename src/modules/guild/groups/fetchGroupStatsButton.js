import './fetchGroupStatsButton.postcss';
import addButton from './addButton';
import getGroupStats from '../../ajax/getGroupStats';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import on from '../../common/on';
import partial from '../../common/partial';
import querySelectorArray from '../../common/querySelectorArray';

function parseGroupData(linkElement, obj) {
  var extraText = '<table class="fshgrpstat">' +
    '<tr>' +
    '<td class="fshBrown">Attack</td>' +
    '<td class="fshRight">' + obj.attack + '</td>' +
    '<td class="fshBrown">Defense</td>' +
    '<td class="fshRight">' + obj.defense + '</td>' +
    '</tr><tr>' +
    '<td class="fshBrown">Armor</td>' +
    '<td class="fshRight">' + obj.armor + '</td>' +
    '<td class="fshBrown">Damage</td>' +
    '<td class="fshRight">' + obj.damage + '</td>' +
    '</tr><tr>' +
    '<td class="fshBrown">HP</td>' +
    '<td class="fshRight">' + obj.hp + '</td>' +
    '<td colspan="2"></td>' +
    '</tr></table>';
  var expiresLocation = linkElement.parentNode.parentNode
    .previousElementSibling;
  insertHtmlBeforeEnd(expiresLocation, extraText);
}

function thisLink(aLink) {
  getGroupStats(aLink.href).then(partial(parseGroupData, aLink));
}

function fetchGroupData(evt) {
  evt.target.disabled = true;
  querySelectorArray('#pCC a[href*="=viewstats&"]').forEach(thisLink);
}

export default function fetchGroupStatsButton(buttonRow) {
  var fetchStats = addButton(buttonRow, 'Fetch Group Stats');
  on(fetchStats, 'click', fetchGroupData);
}
