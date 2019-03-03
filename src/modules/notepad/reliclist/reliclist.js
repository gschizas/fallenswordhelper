import fallback from '../../system/fallback';
import guild from '../../app/guild/guild';
import {pCC} from '../../support/layout';
import padZ from '../../system/padZ';
import partial from '../../common/partial';
import splitTime from '../../common/splitTime';
import {def_subcmd, guideUrl, guildViewUrl} from '../../support/constants';

function getRelicList(offset, myList) {
  return guild({
    subcmd: 'reliclist',
    offset: fallback(offset, 0)
  }).then(function(json) {
    var someRelics = json.r.relics;
    var newList = fallback(myList, []).concat(someRelics);
    if (json.r.remaining_relics > 0) {
      return getRelicList(fallback(offset, 0) + someRelics.length, newList);
    }
    return newList;
  });
}

function relicName(relic) {
  return '<a href="' + guideUrl + 'relics' + def_subcmd +
    'view&relic_id=' + relic.id + '">' + relic.name + '</a>';
}

function guildName(relicGuild) {
  if (relicGuild) {
    return '<a href="' + guildViewUrl + relicGuild.id + '">' +
      relicGuild.name + '</a>';
  }
  return '';
}

function attrib(id, att) {return att.id === id;}

function stamGain(relic) {
  return relic.attributes && relic.attributes.find(partial(attrib, 6));
}

function makeAttrib(attribs, id) {
  if (attribs) {
    var thisAttrib = attribs.find(partial(attrib, id));
    if (thisAttrib) {
      return thisAttrib.value;
    }
  }
  return '';
}

function allAttribs(attribs) {
  return [6, 0, 4, 5, 7, 8].map(partial(makeAttrib, attribs)).join('</td><td>');
}

function formatTime(time) {
  var t = splitTime(time);
  return padZ(t[0]) + 'd ' +
    padZ(t[1]) + 'h ' +
    padZ(t[2]) + 'm ' +
    padZ(t[3]) + 's';
}

function makeRow(relic) {
  return '<tr>' +
    '<td>' + relic.min_level + '</td>' +
    '<td>' + relicName(relic) + '</td>' +
    '<td>' + guildName(relic.guild) + '</td>' +
    '<td>' + allAttribs(relic.attributes) + '</td>' +
    '<td>' + formatTime(relic.time) + '</td>' +
    '</tr>';
}

function makeTable(relicList) {
  return '<style>' +
    '#pCC .reliclist {border-collapse: collapse; border-spacing: 0;}' +
    'table, th, td {border: 1px solid black;}' +
    'th, td {padding: 5px;}' +
    '</style><table class="reliclist"><thead><tr>' +
    '<th>Level</th>' +
    '<th>Name</th>' +
    '<th>Guild</th>' +
    '<th>Stam<br>Gain</th>' +
    '<th>Atk</th>' +
    '<th>Dmg</th>' +
    '<th>Stam</th>' +
    '<th>Gold<br>Gain</th>' +
    '<th>XP<br>Gain</th>' +
    '<th>Time</th>' +
    '</tr></thead><tbody>' +
    relicList.filter(stamGain).map(makeRow).join('') +
    '</tbody></table>';
}

function processRelicList(relicList) {
  pCC.innerHTML = makeTable(relicList);
}

export default function reliclist() {
  pCC.innerHTML = 'Loading...';
  getRelicList().done(processRelicList);
}
