import ajaxReturnCode from '../app/ajaxReturnCode';
import errorDialog from '../app/errorDialog';
import useitem from '../app/profile/useitem';

export default function useItem(backpackInvId) {
  return useitem(backpackInvId).then(errorDialog).then(ajaxReturnCode);
}
