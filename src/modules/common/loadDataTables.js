export default function loadDataTables() {
  return new Promise(resolve => {
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.onload = () => {resolve();};
    scriptTag.src = 'https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js';
    scriptTag.crossOrigin = 'anonymous';
    document.body.appendChild(scriptTag);
  });
}
