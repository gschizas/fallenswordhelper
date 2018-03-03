export default function moreToDo(limit, cntr, list) {
  return list && performance.now() < limit && cntr < list.length;
}
