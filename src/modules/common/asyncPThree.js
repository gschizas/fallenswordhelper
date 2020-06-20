import add from '../support/task';

export default function asyncPThree(fnList) {
  fnList.forEach((fn) => add(3, fn));
}
