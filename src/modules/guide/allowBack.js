export default function allowBack() {
  document.querySelector('input[type="submit"]')
    .addEventListener('click', function(evt) {
      evt.preventDefault();
      var url = 'index.php?';
      Array.prototype.forEach.call(
        document.querySelectorAll('input:not([type="submit"])' +
          ':not([type="checkbox"]), select, input[type="checkbox"]:checked'),
        function(e) {url += '&' + e.name + '=' + e.value;});
      window.location = url;
    });
}
