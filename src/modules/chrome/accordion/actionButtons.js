import anchorButton from './anchorButton';
import {injectAuctionSearch} from '../../notepad/lists/lists';
import injectOnlinePlayers from
  '../../notepad/onlinePlayers/injectOnlinePlayers';
import {injectFindBuffs, injectFindOther} from
  '../../notepad/findBuffs/findBuffs';

export default function actionButtons() {
  anchorButton('2', 'AH Quick Search', injectAuctionSearch,
    'nav-actions-trade-auctionhouse');
  anchorButton('2', 'Online Players', injectOnlinePlayers,
    'nav-actions-interaction-findplayer');
  anchorButton('2', 'Find Other', injectFindOther,
    'nav-actions-interaction-findplayer');
  anchorButton('2', 'Find Buffs', injectFindBuffs,
    'nav-actions-interaction-findplayer');
}
