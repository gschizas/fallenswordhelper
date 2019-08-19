export const server = document.location.protocol + '//' +
  document.location.host + '/';
export const imageServer = window.HCS && window.HCS.defines &&
  window.HCS.defines.fileserver &&
  window.HCS.defines.fileserver.slice(0, -1);
export const cdn = window.HCS && window.HCS.defines && window.HCS.defines.cdn;
