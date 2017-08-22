import retryAjax from '../../ajax/retryAjax';

export default function doinvent(recipe) {
  return retryAjax({
    url: 'app.php',
    data: {
      cmd: 'inventing',
      subcmd: 'doinvent',
      recipe_id: recipe,
      app: '1'
    },
    dataType: 'json'
  });
}
