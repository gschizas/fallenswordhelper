// import { $dataAccess } from './_dataAccess';
// import ajaxQb from './fallbacks/quickbuff';
import appQb from '../app/quickbuff';

export default function daQuickbuff(userAry, buffAry) {
  // return $dataAccess(appQb, ajaxQb, userAry, buffAry);
  return appQb(userAry, buffAry);
}
