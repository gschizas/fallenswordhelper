import './oneByOne.css';
import createButton from '../common/cElement/createButton';
import daSendItems from '../_dataAccess/daSendItems';
import insertElementAfter from '../common/insertElementAfter';
import onclick from '../common/onclick';
import querySelector from '../common/querySelector';
import querySelectorArray from '../common/querySelectorArray';

function sendThem(prm, options) {
  return prm.then((data) => {
    // eslint-disable-next-line no-console
    console.log('promise data', data);
    if (data === null || data.s) {
      return daSendItems(options[0], options[1]);
    }
    return data;
  });
}

function onBtnClick() {
  const user = querySelector(
    'form[name="sendItemForm"] [name="target_username"]',
  );
  const items = querySelectorArray('[name="sendItemList[]"]:checked');
  items.map((el) => [user.value, [el.value]])
    .reduce(sendThem, Promise.resolve(null))
    // eslint-disable-next-line no-console
    .then((finalResult) => { console.log('finalResult', finalResult); });
}

export default function oneByOne() {
  const sendItemBtn = querySelector(
    'form[name="sendItemForm"] input[value="Send"]',
  );
  const myBtn = createButton({
    className: 'fshBl',
    id: 'oneByOneBtn',
    textContent: 'OneByOne',
    type: 'button',
  });
  insertElementAfter(myBtn, sendItemBtn);
  onclick(myBtn, onBtnClick);
}
