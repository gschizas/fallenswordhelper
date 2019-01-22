import keyHandlerEvent from './keyHandlerEvent';
import querySelector from '../../common/querySelector';

export default function movePage(dir) {
  var dirButton = querySelector('#pCC input[value="' + dir + '"]');
  if (!dirButton) {return;}
  keyHandlerEvent('movePage');
  dirButton.click();
}
