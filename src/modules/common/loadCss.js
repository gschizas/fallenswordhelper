export default function loadCss(c) {
  return new Promise(resolve => {
    var linkTag = document.createElement('link');
    linkTag.type = 'text/css';
    linkTag.rel = 'stylesheet';
    linkTag.onload = () => {resolve();};
    linkTag.href = c;
    document.body.appendChild(linkTag);
  });
}
