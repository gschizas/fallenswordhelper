import all from './all';
import loadCss from './loadCss';

function loadScript() {
  return new Promise((resolve) => {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.onload = () => { resolve(); };
    scriptTag.src = 'https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js';
    scriptTag.crossOrigin = 'anonymous';
    document.body.appendChild(scriptTag);
  });
}

export default function loadDataTables() {
  return all([loadScript(), loadCss('_CSSPATH/dataTables.css')]);
}
