import {createTBody, createTr} from '../../common/cElement';

function rowHtml(obj) {
  return `<td>${obj.slot}</td>` +
    `<td>${obj.name}</td>` +
    `<td>${obj.level}</td>` +
    `<td>${obj.rank_name}</td>` +
    `<td>${obj.gxp}</td>` +
    `<td>${obj.activity}</td>` +
    `<td>${obj.pack}</td>` +
    `<td>${obj.stam}</td>`;
}

function rowFactory(aRow) {
  let dom = aRow.dom;
  if (!dom) {
    dom = createTr(
      {innerHTML: rowHtml(aRow)}
    );
  }
  return dom;
}

export default function displayChange(domTable, displayed) {
  const domTBody = domTable.tBodies[0];
  const thisTBody = createTBody();
  for (let r of displayed) {
    thisTBody.appendChild(rowFactory(r.value));
  }
  domTable.replaceChild(thisTBody, domTBody);
}
