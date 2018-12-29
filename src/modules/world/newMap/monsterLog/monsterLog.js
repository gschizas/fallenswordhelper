import badData from '../badData';
import {def_afterUpdateActionlist} from '../../../support/constants';
import retryAjax from '../../../ajax/retryAjax';
import {
  getCreaturePrefs,
  getMyStats,
  processMouseOver,
  showCreatureInfo
} from './creatureInfo';
import {
  getMonsterPrefs,
  processMonsterLog,
  showMonsterLog
} from './processMonsterLog';

function processMonster(data) {
  if (badData(data)) {return;} // creature is null
  processMouseOver(data);
  processMonsterLog(data.response.data);
}

function loopActions(e, i) { // jQuery.min
  if (e.type !== 6) {return;}
  retryAjax({
    url: 'fetchdata.php?a=1&id=' + e.data.id + '&passback=' + i,
    dataType: 'json'
  }).done(processMonster);
}

function getCreatures() {
  if (showCreatureInfo) {getMyStats();}
  GameData.actions().forEach(loopActions);
}

function initMonsterLog() {
  if (showCreatureInfo || showMonsterLog) {
    getCreatures();
  }
}

export default function startMonsterLog() { // jQuery.min
  getCreaturePrefs();
  getMonsterPrefs();
  $.subscribe(def_afterUpdateActionlist, initMonsterLog);
  initMonsterLog();
}
