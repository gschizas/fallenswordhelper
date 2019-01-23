import indexAjax from '../../ajax/indexAjax';

export default function getGuildLogPage(page) {
  return indexAjax({
    data: {
      cmd: 'guild',
      subcmd: 'log',
      page: page,
      no_mobile: 1
    }
  });
}
