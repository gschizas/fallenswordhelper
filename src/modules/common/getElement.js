export function getElementById(id, doc) {
  //#if _DEV  //  Testing getElementById
  // console.log('typeof doc', typeof doc); // eslint-disable-line no-console
  //#endif
  if (doc) {return doc.getElementById(id);}
  return document.getElementById(id);
}
