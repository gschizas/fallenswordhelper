import './arenaJoin.postcss';
import getElementById from '../../common/getElement';
import injectArena from '../arena';
import interceptSubmit from '../../common/interceptSubmit';
import showAttribs from './showAttribs';
import takeSnapshot from './takeSnapshot';
import view from '../../app/arena/view';

export default function arenaJoin() {
  const tabs = getElementById('arenaTypeTabs');
  if (tabs) {
    injectArena();
  } else {
    interceptSubmit();
    view().catch(() => ({})).then(showAttribs);
    // eslint-disable-next-line no-unused-labels, no-labels
    devLbl: { //  arena snapshot
      takeSnapshot();
    }
  }
}
