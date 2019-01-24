import indexAjaxData from './indexAjaxData';

export default function onlinePlayersPage(page) {
  return indexAjaxData({
    cmd: 'onlineplayers',
    page: page
  });
}
