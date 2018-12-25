import {tableDraw} from './doTable';

export default function changeLvl(e) { // jQuery
  if (e.target.id === 'fshMinLvl' || e.target.id === 'fshMaxLvl') {
    tableDraw();
  }
}
