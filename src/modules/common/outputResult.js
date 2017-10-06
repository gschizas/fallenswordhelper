export default function outputResult(result, handle) {
  handle.insertAdjacentHTML('beforeend',
    '<li class="fshNbrList">' + result + '</li>');
}
