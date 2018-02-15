import insertHtml from './insertHtml';

export default function insertHtmlBeforeEnd(parent, html) {
  insertHtml(parent, 'beforeend', html);
}
