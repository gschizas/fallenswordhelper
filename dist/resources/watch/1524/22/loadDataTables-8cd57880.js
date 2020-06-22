import { aZ as loadCss } from './calfSystem-995e3482.js';
import { a as all } from './all-eb78e4af.js';

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
  return all([loadScript(), loadCss('https://localhost:9966/dist/resources/watch/1524/dataTables.css')]);
}

export { loadDataTables as l };
//# sourceMappingURL=loadDataTables-8cd57880.js.map
