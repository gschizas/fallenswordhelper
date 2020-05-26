import anchorButton from './anchorButton';
import getValue from '../../system/getValue';
import {
  injectAuctionSearch,
  injectFindBuffs,
  injectFindOther,
  injectOnlinePlayers,
} from '../pageSwitcher/loader';

export default function actionButtons() {
  if (getValue('auctionSearchLink')) {
    anchorButton('2', 'AH Quick Search', injectAuctionSearch,
      'nav-actions-trade-auctionhouse');
  }
  if (getValue('onlinePlayersLink')) {
    anchorButton('2', 'Online Players', injectOnlinePlayers,
      'nav-actions-interaction-findplayer');
  }
  if (getValue('findOtherLink')) {
    anchorButton('2', 'Find Other', injectFindOther,
      'nav-actions-interaction-findplayer');
  }
  if (getValue('findBuffsLink')) {
    anchorButton('2', 'Find Buffs', injectFindBuffs,
      'nav-actions-interaction-findplayer');
  }
}
