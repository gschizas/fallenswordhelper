export default function updateHCSQuickBuffLinks(selector) {
  Array.prototype.forEach.call(document.querySelectorAll(selector),
    function(el) {
      el.href = el.getAttribute('href').replace(/, 500/g, ', 1000'); // getAttribute neccessary for FF
    }
  );
}
