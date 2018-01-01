export default function moreToDo(limit, cntr, list) {
  return performance.now() < limit && cntr < list.length;
}
