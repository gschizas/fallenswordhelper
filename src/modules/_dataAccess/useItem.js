import {composingFragmentType} from '../support/constants';
import indexAjaxData from '../ajax/indexAjaxData';
import infoBoxFrom from '../common/InfoBoxFrom';

const extract = info => ({r: {item: {n: info.match(/'(.*)'/)[1]}}, s: true});

function fragObj(pair) {
  const thisResult = pair.match(/(\d+) x (.*)/);
  return {
    amount: thisResult[1],
    type: composingFragmentType.indexOf(thisResult[2])
  };
}

function stash(info) {
  const frags = info.match(/You gained (.*) Fragments/)[1].split(', ')
    .map(fragObj);
  return {r: {frags}, s: true};
}

const outputLookup = [
  ['You successfully used', () => ({s: true})],
  ['You successfully extracted', extract],
  ['You failed to extract', () => ({r: {}, s: true})],
  ['You gained', stash]
];

function formatResults(html) {
  const info = infoBoxFrom(html);
  const thisResult = outputLookup.find(e => info.startsWith(e[0]));
  if (thisResult) {return thisResult[1](info);}
  return {e: {message: info}, s: false};
}

export default function useItem(backpackInvId) {
  return indexAjaxData({
    cmd: 'profile',
    subcmd: 'useitem',
    inventory_id: backpackInvId
  }).then(formatResults);
}
