import { options } from './options';
import querySelectorArray from '../../common/querySelectorArray';
import saveOptions from './saveOptions';

export default function setChecks() {
  querySelectorArray('table.fshInvFilter input[type="checkbox"]').forEach(
    (el) => {
      // eslint-disable-next-line no-param-reassign
      el.checked = options.checkedElements[el.getAttribute('item')] === 1;
    },
  );
  saveOptions(options);
}
