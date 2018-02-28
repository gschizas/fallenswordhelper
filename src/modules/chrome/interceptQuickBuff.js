function getPos(available, desired, offset) {
  return Math.floor(Math.max(available - desired, 0) / 2 + offset);
}

function fshOpen(url, title, w, _h, features) {
  var h = _h;
  if (_h === 500) {h = 1000;}
  var top = getPos(window.screen.availHeight, h, window.screenY);
  var left = getPos(document.documentElement.clientWidth, w, window.screenX);
  window.open(url, title, 'width=' + w + ', height=' + h + ', left=' + left +
    ', top=' + top + features);
}

export default function interceptQuickBuff() {
  window.openWindow = fshOpen;
}

// export default function interceptQuickBuff() {
//   window.openWindow = fshOpen;
//   export default function interceptQuickBuff(url, title, w, h, features) {

//   var pixelRatio = window.devicePixelRatio;

//   var chrome = 1;
//   if (navigator.userAgent.includes('Chrome')) {
//     chrome = pixelRatio;
//   }

//   var docHeightInCss = document.documentElement.clientHeight;
//   var screenYInCss = Math.floor(window.screenY / chrome);
//   var desiredHeightInCss = Math.min(h, window.screen.availHeight);

//   var docWidthInCss = document.documentElement.clientWidth;
//   var screenXInCss = Math.floor(window.screenX / chrome);
//   var desiredWidthInCss = w;

//   console.log('pixelRatio', pixelRatio);
//   console.log('docHeightInCss', docHeightInCss);
//   console.log('screenYInCss', screenYInCss);
//   console.log('desiredHeightInCss', desiredHeightInCss);
//   console.log('docWidthInCss', docWidthInCss);
//   console.log('screenXInCss', screenXInCss);
//   console.log('desiredWidthInCss', desiredWidthInCss);

//   var topInCss = Math.floor(
//     (docHeightInCss - desiredHeightInCss) / 2 + screenYInCss
//   );

//   var leftInCss = Math.floor(
//     (docWidthInCss - desiredWidthInCss) / 2 + screenXInCss
//   );

//   window.open(url, title,
//     'width=' + Math.floor(desiredWidthInCss * chrome) +
//     ', height=' + Math.floor(desiredHeightInCss * chrome) +
//     ', top=' + Math.floor(topInCss * chrome) +
//     ', left=' + Math.floor(leftInCss * chrome) +
//     features);
// }
