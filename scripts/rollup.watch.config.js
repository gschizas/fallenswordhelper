import calfWatch from './calfwatch.js';
import fshWatch from './fshwatch.js';

export default function watchConfig() {
  return [
    fshWatch,
    calfWatch
  ];
}
