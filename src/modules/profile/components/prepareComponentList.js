export var componentList;

function tallyComponent(prev, el) {
  prev[el.b] = prev[el.b] || {
    a: el.a,
    b: el.b,
    count: 0,
    del: [],
    v: el.v
  };
  prev[el.b].count += 1;
  prev[el.b].del.push(el.a);
  return prev;
}

export function prepareComponentList(data) {
  componentList = data.r.reduce(tallyComponent, {});
}
