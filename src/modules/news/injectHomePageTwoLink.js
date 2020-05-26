import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import querySelector from '../common/querySelector';
import { archiveUrl, updateArchiveUrl } from '../support/constants';

const pageTwoLink = (url, type) => `&nbsp;<a href="${
  url}&page=2">View ${type} Page 2</a>`;

export default function injectHomePageTwoLink() {
  const updateLink = querySelector(`#pCC a[href="${updateArchiveUrl}"]`);
  if (!updateLink) { return; }
  insertHtmlAfterEnd(updateLink, pageTwoLink(updateArchiveUrl, 'Updates'));
  const archiveLink = querySelector(`#pCC a[href="${archiveUrl}"]`);
  insertHtmlAfterEnd(archiveLink, pageTwoLink(archiveUrl, 'News'));
}
