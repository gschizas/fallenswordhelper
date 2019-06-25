import {composingFragmentType} from '../support/constants';
import indexAjaxData from '../ajax/indexAjaxData';
import infoBoxFrom from '../common/InfoBoxFrom';

function fragObj(result) {
  const thisResult = result.match(/(\d+) x (.*)/);
  return {
    amount: thisResult[1],
    type: composingFragmentType.indexOf(thisResult[2])
  };
}

const outputLookup = [
  ['You successfully used', () => ({s: true})],
  ['You successfully extracted', info => ({
    r: {item: {n: info.match(/'(.*)'/)[1]}},
    s: true
  })],
  ['You failed to extract', () => ({r: {}, s: true})],
  ['You gained', info => {
    const frags = info.match(/You gained (.*) Fragments/)[1].split(', ')
      .map(fragObj);
    return {r: {frags}, s: true};
  }]
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
