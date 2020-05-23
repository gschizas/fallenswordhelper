import chunk from '../../common/chunk';
import daDropItems from '../../_dataAccess/daDropItems';
import errorDialog from '../../common/errorDialog';
import on from '../../common/on';
import querySelectorArray from '../../common/querySelectorArray';

const destroyChunk = (itemsAry) => {
  daDropItems(itemsAry.map((i) => i.value))
    .then(errorDialog)
    .then((json) => {
      if (!json.s) { return; }
      itemsAry.forEach((j) => {
        const tr = j.closest('tr');
        tr.nextElementSibling.remove();
        tr.remove();
      });
    });
};

const checkItems = (e) => {
  if (!e.returnValue) { return; }
  e.preventDefault();
  const items = querySelectorArray('[name="removeIndex[]"]:checked');
  chunk(30, items).forEach(destroyChunk);
};

export default function interceptDestroy() {
  on(document.forms[0], 'submit', checkItems);
}
