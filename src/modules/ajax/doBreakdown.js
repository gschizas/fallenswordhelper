import indexAjax from './indexAjax';

export default function doBreakdown(selectedList) {
  return indexAjax({
    type: 'POST',
    data: {
      cmd: 'composing',
      subcmd: 'dobreakdown',
      item_list: selectedList
    },
    dataType: 'json'
  });
}
