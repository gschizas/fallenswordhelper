import add from '../../support/task';
import calf from '../../support/calf';
import gameHelpLink from './gameHelpLink';
import {getElementById} from '../../common/getElement';
import getValue from '../../system/getValue';
import injectHelperMenu from '../helperMenu';
import jsonParse from '../../common/jsonParse';
import notHuntMode from './notHuntMode';
import replaceKeyHandler from '../keyHandler/keyHandler';

function prepareEnv() {
  if (getValue('gameHelpLink')) {
    add(3, gameHelpLink);
  }
  calf.huntingMode = getValue('huntingMode');
  add(3, replaceKeyHandler);
  notHuntMode();
  if (!getValue('hideHelperMenu')) {
    add(3, injectHelperMenu);
  }
}

function findHcsData() {
  var hcsHtml = getElementById('html');
  if (hcsHtml) {return hcsHtml.dataset.hcs;}
}

export default function lookForHcsData() {
  var hcsData = findHcsData();
  if (hcsData && jsonParse(hcsData)['new-ui']) {
    prepareEnv();
  }
}
