/*
Based on
fiddle.jshell.net/GRIFFnDOOR/r7tvg/
*/

var heap = [null];

function cmp(i,j) {
  return heap[i] && heap[i].priority < heap[j].priority;
}

function swp(i,j) {
  var temp = heap[i];
  heap[i] = heap[j];
  heap[j] = temp;
}

function sink(i) {
  while (i * 2 < heap.length) {
    var leftHigher = !cmp(i * 2 + 1, i * 2);
    var childIndex = leftHigher ? i * 2 : i * 2 + 1;
    if (cmp(i,childIndex)) {break;}
    swp(i, childIndex);
    i = childIndex;
  }
}

function bubble(i) {
  while (i > 1) { 
    var parentIndex = i >> 1;
    if (!cmp(i, parentIndex)) {break;}
    swp(i, parentIndex);
    i = parentIndex;
  }
}

function pop() {
  if (heap.length === 1) {return;}
  var topVal = heap[1].data;
  var last = heap.pop();
  if (heap.length > 1) {
    heap[1] = last;
    sink(1);
  }
  return topVal;
}

function push(data, priority) {
  bubble(heap.push({data: data, priority: priority}) -1);
}

function ln() {
  return heap.length - 1;
}

export default {
  getLength: ln,
  push: push,
  pop: pop
};
