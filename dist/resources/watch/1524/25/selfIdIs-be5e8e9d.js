import { s as partial } from './calfSystem-0ffc234f.js';

function idTest(id, target) {
  return target.id === id;
}

function selfIdIs(id) {
  return partial(idTest, id);
}

export { selfIdIs as s };
//# sourceMappingURL=selfIdIs-be5e8e9d.js.map
