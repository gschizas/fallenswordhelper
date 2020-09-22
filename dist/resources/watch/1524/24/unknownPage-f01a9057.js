import { E as querySelectorArray, K as getTextTrim, s as partial, bB as fshBuffLog, G as getValue, x as jQueryNotPresent, D as querySelector, bM as screenview, bN as news, y as getElementById, bO as injectQuestBookFull, ab as querySelectorAll, bP as inventing } from './calfSystem-dea093d3.js';
import './numberIsNaN-00e0daaf.js';
import { s as set, g as get } from './idb-8edbec07.js';
import './isDate-1ee2b7eb.js';
import './padZ-cba8efb8.js';
import { f as formatLocalDateTime } from './formatLocalDateTime-41195800.js';
import { x as xPath } from './xPath-eafae93b.js';
import { b as buffList } from './buffObj-370bcf38.js';

let transform;

function buildTransform() {
  if (!transform) {
    transform = new RegExp(
      'Skill ([\\w ]*) level (\\d*) was activated on \'(\\w*)\'|'
      + 'The skill ([\\w ]*) of (current or higher '
      + 'level is currently active) on \'(\\w*)\'|'
      + 'Player \'(\\w*)\' (has set their preferences to block '
      + 'the skill) \'([\\w ]*)\' from being cast on them.',
    );
  }
}

function meta(report) {
  return transform.exec(report);
}

function buffReportParser(scope) {
  buildTransform();
  const buffsAttempted = querySelectorArray('#quickbuff-report font', scope)
    .map(getTextTrim).map(meta);
  return buffsAttempted;
}

function getBuff(thisBuff) {
  return buffList.find((e) => e.name === thisBuff);
}

function getStamAsString(buffCast) {
  // var thisBuff = buffList.find(partial(buff, buffCast[1]));
  const thisBuff = getBuff(buffCast);
  if (thisBuff) { return thisBuff.stam.toString(); }
  return '-';
}

const success = (e) => ` ${e[0]} (${getStamAsString(e[1])
} stamina)<br>`;
const reject = (e) => ` <span class="fshRed">${e[0]}</span><br>`;

function logFormat(timeStamp, el) {
  let result;
  if (el[1]) {
    result = success(el);
  } else {
    result = reject(el);
  }
  return timeStamp + result;
}

function buffResult(buffLog) {
  const timeStamp = formatLocalDateTime(new Date());
  const buffsAttempted = buffReportParser(document)
    .map(partial(logFormat, timeStamp));
  set(fshBuffLog, buffsAttempted.reverse().join('') + buffLog);
}

function updateBuffLog() {
  if (!getValue('keepBuffLog')) { return; }
  get(fshBuffLog).then(buffResult);
}

const unknown = [
  [
    () => querySelector('.news_left_column'),
    () => {
      screenview('unknown.news');
      news();
    },
  ],
  [
    () => getElementById('quickbuff-report'),
    () => {
      screenview('unknown.buffLog.updateBuffLog');
      updateBuffLog();
    },
  ],
  [
    () => xPath('//td[.="Quest Name"]'),
    () => {
      screenview('unknown.questBook.injectQuestBookFull');
      injectQuestBookFull();
    },
  ],
  [
    () => querySelectorAll('#pCC img[title="Inventing"]').length > 0,
    () => {
      screenview('unknown.recipes.inventing');
      inventing();
    },
  ],
];

// eslint-disable-next-line no-unused-labels, no-labels
devLbl: { // Fell through!
  unknown.push(
    [
      () => true,
      // eslint-disable-next-line no-console
      () => { console.log('Fell through!'); },
    ],
  );
}

function unknownPage() { // Legacy
  if (jQueryNotPresent()) { return; }
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { // unknownPage
    // eslint-disable-next-line no-console
    console.log('unknownPage');
  }
  const known = unknown.find((el) => el[0]());
  if (known) { known[1](); }
}

export default unknownPage;
//# sourceMappingURL=unknownPage-f01a9057.js.map
