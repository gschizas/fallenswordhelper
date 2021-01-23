import { s as partial } from './calfSystem-91adbec8.js';

function idTest(id, target) {
  return target.id === id;
}

function selfIdIs(id) {
  return partial(idTest, id);
}

export { selfIdIs as s };
//# sourceMappingURL=selfIdIs-0ee4d4ec.js.map
