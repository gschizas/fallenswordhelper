import { u as partial } from './calfSystem-05ea3a63.js';

function idTest(id, target) {
  return target.id === id;
}

function selfIdIs(id) {
  return partial(idTest, id);
}

export { selfIdIs as s };
//# sourceMappingURL=selfIdIs-f5aed12b.js.map
