import ajaxReturnCode from '../common/ajaxReturnCode';
import {daUseItem} from '../_dataAccess/_dataAccess';
import errorDialog from '../common/errorDialog';

export default function useItem(backpackInvId) {
  return daUseItem(backpackInvId).then(errorDialog).then(ajaxReturnCode);
}
