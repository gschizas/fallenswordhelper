import querySelectorArray from '../../common/querySelectorArray';

export default function getCheckedItems() {
  return querySelectorArray('[name="removeIndex[]"]:checked');
}
