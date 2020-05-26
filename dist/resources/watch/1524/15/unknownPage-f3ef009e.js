import { H as querySelectorArray, aQ as getTextTrim, r as partial, a5 as set, bO as fshBuffLog, D as getValue, a7 as get, w as jQueryNotPresent, M as querySelector, bY as screenview, bZ as news, x as getElementById, b_ as injectQuestBookFull, ak as querySelectorAll, b$ as inventing } from './calfSystem-b469667c.js';
import './numberIsNaN-37f2e6cd.js';
import './isDate-50384901.js';
import './padZ-d111932e.js';
import { f as formatLocalDateTime } from './formatLocalDateTime-6cbadd4f.js';
import { x as xPath } from './xPath-928f56d3.js';
import { b as buffList } from './buffObj-97d4ebd1.js';

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
//# sourceMappingURL=unknownPage-f3ef009e.js.map
