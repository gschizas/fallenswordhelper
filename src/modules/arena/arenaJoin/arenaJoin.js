import './arenaJoin.postcss';
import {getElementById} from '../../common/getElement';
import {injectArena} from '../arena';
import once from '../../common/once';
import {pCC} from '../../support/layout';
import querySelector from '../../common/querySelector';
import showAttribs from './showAttribs';
import updateUrl from './updateUrl';
import view from '../../app/arena/view';

function allowBack() {
  const submitButton = querySelector('input[type="submit"]', pCC);
  if (submitButton) {
    once(submitButton, 'click', updateUrl);
  }
}

export default function arenaJoin() {
  const tabs = getElementById('arenaTypeTabs');
  if (tabs) {
    injectArena();
  } else {
    allowBack();
    view().then(showAttribs);
  }
}
