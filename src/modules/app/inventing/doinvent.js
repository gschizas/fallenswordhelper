import callApp from '../callApp';

export default function doinvent(recipe) {
  return callApp({
    cmd: 'inventing',
    subcmd: 'doinvent',
    recipe_id: recipe,
    app: '1'
  });
}
