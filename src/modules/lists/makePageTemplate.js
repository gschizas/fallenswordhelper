import makePageHeader from './makePageHeader';

// function makePageTemplate(title, comment, spanId, button, divId) {
export default function makePageTemplate(o) {
  return makePageHeader(o.title, o.comment, o.spanId, o.button) +
    '<div class="fshSmall" id="' + o.divId + '"></div>';
}
