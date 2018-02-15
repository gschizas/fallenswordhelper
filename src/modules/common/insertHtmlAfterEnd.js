import insertHtml from './insertHtml';

export default function insertHtmlAfterEnd(parent, html) {
  insertHtml(parent, 'afterend', html);
}
