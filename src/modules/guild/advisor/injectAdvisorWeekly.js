import addCommas from '../../system/addCommas';
import advisorView from '../../app/guild/advisorView';
import {createTFoot} from '../../common/cElement';
import getMembrList from '../../ajax/getMembrList';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import partial from '../../common/partial';
import when from '../../common/when';
import {injectTable, playerName, playerRank} from './helpers';
//#if _BETA  //  Timing output
import {time, timeEnd} from '../../support/debug';
//#endif

function returnAdvisorPage(list, e, response) {
  insertHtmlBeforeEnd(list.lastElementChild.lastElementChild,
    ' day ' + e + ',');
  return response.r;
}

function getAdvisorPage(list, e) { // jQuery.min
  return advisorView(e).pipe(partial(returnAdvisorPage, list, e));
}

function addElements(ary, v, i) {
  return v + ary[i];
}

function addStuff(prev, curr) {
  return prev.map(function(el, i) {
    el.stats = el.stats.map(partial(addElements, curr[i].stats));
    return el;
  });
}

function reorgStats(el) {
  return {
    player: el.player,
    stats: [el.stats[6], el.stats[7], el.stats[6] + el.stats[7], el.stats[1],
      el.stats[2], el.stats[3], el.stats[4], el.stats[8], el.stats[5]]
  };
}

function addUpStats(args) {
  return args.slice(2).reduce(addStuff, args[1]).map(reorgStats);
}

function makeTotal(prev, curr) {
  return curr.stats.map(partial(addElements, prev));
}

function footerStats(prev, curr) {
  return prev + '<td><u>' + curr + '</u></td>';
}

function makeTfoot(added) {
  var stats = added.slice(1).reduce(makeTotal, added[0].stats).map(addCommas);
  return createTFoot({
    innerHTML: '<tr><td class="fshRight" ' +
    'colspan="3">Total: </td>' +
    stats.reduce(footerStats, '') +
    '</tr>'
  });
}

function makeData(membrList, el) {
  var stats = el.stats.map(addCommas);
  return [
    playerName(el.player.name, membrList),
    el.player.level,
    playerRank(el.player.name, membrList)
  ].concat(stats);
}

function addAdvisorPages(list) {
  var args = Array.from(arguments).slice(1);
  var added = addUpStats(args);
  injectTable(list,
    makeTfoot(added),
    added.map(partial(makeData, args[0]))
  );
}

export default function injectAdvisorWeekly(list) { // jQuery
  //#if _BETA  //  Timing output

  time('guildAdvisor.injectAdvisorWeekly');

  //#endif
  list.innerHTML = '<span class="fshCurveContainer fshFlex">' +
    '<span class="fshCurveEle fshCurveLbl fshOldSpinner"></span>' +
    '<span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span>' +
    '</span>';

  var prm = [getMembrList(false)]
    .concat([1, 2, 3, 4, 5, 6, 7].map(partial(getAdvisorPage, list)));

  when(prm, partial(addAdvisorPages, list));
  //#if _BETA  //  Timing output

  timeEnd('guildAdvisor.injectAdvisorWeekly');

  //#endif
}
