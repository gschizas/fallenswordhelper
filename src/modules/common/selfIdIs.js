import partial from './partial';

function idTest(id, self) {
  return self.id === id;
}

export default function selfIdIs(id) {
  return partial(idTest, id);
}
