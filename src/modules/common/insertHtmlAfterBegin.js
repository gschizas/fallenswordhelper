import insertHtml from './insertHtml';

export default function insertHtmlAfterBegin(parent, html) {
  insertHtml(parent, 'afterbegin', html);
}
