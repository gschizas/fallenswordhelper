import calfWatch from './calfwatch';
import fshWatch from './fshwatch';

export default function watchConfig() {
  return [
    fshWatch,
    calfWatch,
  ];
}
