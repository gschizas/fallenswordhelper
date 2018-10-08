import retryAjax from './retryAjax';
import rnd from '../system/rnd';

export default function createPotionFromTemplate(tempId) {
  return retryAjax({
    cache: false,
    dataType: 'json',
    url: 'index.php',
    data: {
      cmd: 'composing',
      subcmd: 'createajax',
      template_id: tempId,
      _rnd: rnd()
    }
  });
}
