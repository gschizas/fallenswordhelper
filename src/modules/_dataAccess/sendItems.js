import indexAjaxData from '../ajax/indexAjaxData';

export default function senditems(user, invIdAry) {
  return indexAjaxData({
    cmd: 'trade',
    subcmd: 'senditems',
    xc: window.ajaxXC,
    target_username: user,
    sendItemList: invIdAry
  });
}
