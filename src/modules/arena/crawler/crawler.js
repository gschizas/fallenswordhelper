import allthen from '../../common/allthen';
import alpha from '../../common/alpha';
import createDocument from '../../system/createDocument';
import {entries} from '../../common/entries';
import getText from '../../common/getText';
import getTextTrim from '../../common/getTextTrim';
import hideQTip from '../../common/hideQTip';
import indexAjaxData from '../../ajax/indexAjaxData';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import {keys} from '../../common/keys';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import querySelectorArray from '../../common/querySelectorArray';
import {createButton, createDiv} from '../../common/cElement';

let container;

function completed(page) {
  return indexAjaxData({
    cmd: 'arena',
    subcmd: 'completed',
    page: page || 1
  }).then(createDocument).finally(() => {
    insertHtmlBeforeEnd(container, 'Got Page ' + page + ', ');
  });
}

function results(id) {
  return indexAjaxData({
    cmd: 'arena',
    subcmd: 'results',
    pvp_id: id
  }).then(createDocument).finally(() => {
    insertHtmlBeforeEnd(container, 'Got Arena ' + id + ', ');
  });
}

function getIds(prev, doc) {
  querySelectorArray('#pCC input[name="pvp_id"]', doc)
    .map(e => e.value).forEach(v => {
      prev[v] = true;
    });
  return prev;
}

function getWinner(prev, doc) {
  const moveImg = querySelector('#pCC img[src*="/pvp/"]', doc);
  const thisWinner = getTextTrim(
    querySelector(
      '#pCC > table > tbody > tr:last-of-type > td > table > tbody > ' +
        'tr:last-of-type > td:nth-child(2)',
      doc
    )
  );
  if (!prev[thisWinner]) {prev[thisWinner] = [0, 0];}
  if (moveImg === null) {
    prev[thisWinner][1] += 1;
  } else {
    prev[thisWinner][0] += 1;
  }
  return prev;
}

function desc([aname, awins], [bname, bwins]) {
  return bwins[1] - awins[1] || bwins[0] - awins[0] || alpha(aname, bname);
}

function processResults(ary) {
  // console.log('ary', ary);
  const winners = entries(ary.reduce(getWinner, {})).sort(desc)
    .map(e => [e[0], ...e[1]]);
  console.log('winners', winners); // eslint-disable-line

}

function processPages(ary) {
  // console.log('ary', ary);
  const pvpids = keys(ary.reduce(getIds, {}));
  // console.log('pvpids', pvpids);
  allthen(pvpids.map(results), processResults);
}

function processFirstPage(doc) {
  const maxPage = Number(getText(querySelector('#pCC input[value="Go"]', doc)
    .parentNode.previousElementSibling).replace(/\D/g, ''));
  const otherPages = Array.from(Array(maxPage - 1), (e, i) => i + 2);
  // const otherPages = Array.from(Array(4), (e, i) => i + 2);
  // console.log(otherPages);
  allthen([doc].concat(otherPages.map(completed)), processPages);
}

function startCrawl(start) {
  hideQTip(start);
  start.remove();
  completed(1).then(processFirstPage);
}

export default function crawler() {
  container = createDiv();
  const start = createButton({
    className: 'fshBl tip-static',
    dataset: {tipped: 'DANGER!'},
    textContent: 'Start crawl'
  });
  insertElement(container, start);
  insertElement(pCC, container);
  on(start, 'click', partial(startCrawl, start));
}
