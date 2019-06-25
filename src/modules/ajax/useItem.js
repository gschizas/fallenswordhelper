import ajaxReturnCode from '../app/ajaxReturnCode';
import daUseItem from '../_dataAccess/daUseItem';
import errorDialog from '../app/errorDialog';

export default function useItem(backpackInvId) {
  return daUseItem(backpackInvId).then(errorDialog).then(ajaxReturnCode);
}
