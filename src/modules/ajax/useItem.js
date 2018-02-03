import errorDialog from '../app/errorDialog';
import useitem from '../app/profile/useitem';

export default function useItem(backpackInvId) {
  return useitem(backpackInvId).pipe(errorDialog);
}
