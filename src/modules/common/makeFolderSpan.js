function spacer(key) {
  if (key === '0') {return '';}
  return ' &ensp;';
}

export default function makeFolderSpan(key, value) {
  return spacer(key) +
    '<span class="fshLink fshNoWrap fshFolder fshVMid" data-folder="' +
    key + '">' + value + '</span>';
}
