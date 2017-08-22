import retryAjax from '../../ajax/retryAjax';

export default function unequipitem(item) {
  return retryAjax({
    url: 'app.php',
    data: {
      cmd: 'profile',
      subcmd: 'unequipitem',
      inventory_id: item,
      app: '1'
    },
    dataType: 'json'
  });
}
