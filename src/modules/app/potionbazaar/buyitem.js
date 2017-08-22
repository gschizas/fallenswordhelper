import retryAjax from '../../ajax/retryAjax';

export default function buyitem(item) {
  return retryAjax({
    url: 'app.php',
    data: {
      cmd: 'potionbazaar',
      subcmd: 'buyitem',
      item_id: item,
      app: '1'
    },
    dataType: 'json'
  });
}
