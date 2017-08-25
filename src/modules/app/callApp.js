import retryAjax from '../ajax/retryAjax';

export default function callApp(data) {
  return retryAjax({
    url: 'app.php',
    data: data,
    dataType: 'json'
  });
}
