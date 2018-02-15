import insertHtml from './insertHtml';

export default function insertHtmlBeforeBegin(parent, html) {
  insertHtml(parent, 'beforebegin', html);
}
