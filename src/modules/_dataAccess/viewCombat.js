import combatView from '../ajax/combatView';
import createDocument from '../system/createDocument';
import {getElementById} from '../common/getElement';
import getText from '../common/getText';
import getTextTrim from '../common/getTextTrim';
import partial from '../common/partial';
import querySelectorArray from '../common/querySelectorArray';
import {sendEvent} from '../support/fshGa';

function getId(e) {
  return Number(e.getAttribute('background').match(/\/(\d+)/)[1]);
}

function getResult(script, e) {
  const thisRe = new RegExp(e + ' = (\\d+)');
  return Number(script.match(thisRe)[1]);
}

const specialMask = [
  [18, /(\w+)+ leeched the buff '([A-Za-z ]+)'./],
  [21,
    /(\w+)+ was mesmerized by Spell Breaker, losing the '([A-Za-z ]+)' buff./]
];

function gettokens(spec) {
  // const [specId, specMatch] = specialMask
  //   .map(([id, mask]) => [id, spec.match(mask)])
  //   .find(([, match]) => match);
  // return {id: specId, params: [specMatch[1], specMatch[2]]};
  const thisTests = specialMask
    .map(([id, mask]) => [id, spec.match(mask)])
    .find(([, match]) => match);
  if (!thisTests) {
    sendEvent('Logs', 'Missing PvP Special', spec);
    return {id: -1, params: ['-1', '-1']};
  }
  return {id: thisTests[0], params: [thisTests[1][1], thisTests[1][2]]};
}

function formatSpecial(pCC) {
  const spec = querySelectorArray('#specialsDiv', pCC)
    .map(getTextTrim)
    .filter(t => ['leeched', 'Spell'].some(s => t.includes(s)))
    .map(gettokens);
  return spec;
}

function attacker(header) {
  return {
    id: getId(header.rows[1].cells[0]),
    name: getTextTrim(header.rows[0].cells[0])
  };
}

function defender(header) {
  return {
    id: getId(header.rows[1].cells[2]),
    name: getTextTrim(header.rows[0].cells[2])
  };
}

function reportObject(id, pCC, script, header) {
  return {
    attacker: attacker(header),
    defender: defender(header),
    gold_gain: getResult(script, 'goldGain'),
    gold_stolen: getResult(script, 'goldStolen'),
    id: Number(id),
    pvp_prestige_gain: getResult(script, 'prestigeGain'),
    pvp_rating_change: getResult(script, 'pvpRatingChange'),
    specials: formatSpecial(pCC),
    winner: getResult(script, 'winner'),
    xp_gain: getResult(script, 'xpGain')
  };
}

function parseReport(id, html) {
  const doc = createDocument(html);
  const pCC = getElementById('pCC', doc);
  const script = getText(pCC.children[1]);
  const header = pCC.children[0].rows[5].cells[0].children[0];
  return {
    r: reportObject(id, pCC, script, header),
    s: true
  };
}

// Incomplete
export default function viewCombat(id) {
  return combatView(id).then(partial(parseReport, id));
}
