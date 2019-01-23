import indexAjax from './indexAjax';
import rnd from '../system/rnd';

export default function createPotionFromTemplate(tempId) {
  return indexAjax({
    cache: false,
    dataType: 'json',
    data: {
      cmd: 'composing',
      subcmd: 'createajax',
      template_id: tempId,
      _rnd: rnd()
    }
  });
}
