import retryAjax from '../../ajax/retryAjax';

export default function useitem(item) {
  return retryAjax({
    url: 'app.php',
    data: {
      cmd: 'profile',
      subcmd: 'useitem',
      inventory_id: item,
      app: '1'
    },
    dataType: 'json'
  });
}
