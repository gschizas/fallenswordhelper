import retryAjax from '../../ajax/retryAjax';

export default function getGuildLogPage(page) {
  return retryAjax({
    url: 'index.php',
    data: {no_mobile: 1, cmd: 'guild', subcmd: 'log', page: page},
    datatype: 'html'
  });
}
