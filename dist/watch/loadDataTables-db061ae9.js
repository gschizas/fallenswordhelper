import { bj as loadCss } from './calfSystem-cb5d894f.js';
import { a as all } from './all-e75ce0da.js';

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

function loadDataTables() {
  return all([loadScript(), loadCss('https://localhost:9966/dist/watch/dataTables.css')]);
}

export { loadDataTables as l };
//# sourceMappingURL=loadDataTables-db061ae9.js.map
