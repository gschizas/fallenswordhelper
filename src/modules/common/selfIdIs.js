import partial from './partial';

function idTest(id, target) {
  return target.id === id;
}

export default function selfIdIs(id) {
  return partial(idTest, id);
}
