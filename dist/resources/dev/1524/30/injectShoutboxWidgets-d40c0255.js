import{y as t,f as e,t as s,A as a}from"./calfSystem-54df10e3.js"
let r,n
function l(t){let e=r.value,s=e.length
s>t&&(e=e.substring(0,t),r.value=e,s=t),n||(n=r.parentNode.parentNode.parentNode.parentNode.insertRow().insertCell()),a(`<table class="sbpTbl"><tbody><tr><td class="sbpHdr">Preview (${s}/${t} characters)</td></tr><tr><td class="sbpMsg"><span>${e}</span></td></tr></tbody></table>`,n)}function o(a){r=t("textInputBox"),e(r,"keyup",s(l,a))}export{o as i}
//# sourceMappingURL=injectShoutboxWidgets-d40c0255.js.map
