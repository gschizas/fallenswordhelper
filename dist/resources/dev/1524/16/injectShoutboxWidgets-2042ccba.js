import{x as t,e,s,z as a}from"./calfSystem-d49dbbd3.js"
let r,n
function d(t){let e=r.value,s=e.length
s>t&&(e=e.substring(0,t),r.value=e,s=t),n||(n=r.parentNode.parentNode.parentNode.parentNode.insertRow().insertCell()),a(`<table class="sbpTbl"><tbody><tr><td class="sbpHdr">Preview (${s}/${t} characters)</td></tr><tr><td class="sbpMsg"><span>${e}</span></td></tr></tbody></table>`,n)}function l(a){r=t("textInputBox"),e(r,"keyup",s(d,a))}export{l as i}
//# sourceMappingURL=injectShoutboxWidgets-2042ccba.js.map
